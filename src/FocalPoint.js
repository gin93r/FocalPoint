/**
 * Will allow a focal point of an image when 
 * containers are smaller than the image size.
 * @param  {[type]} $ jQuery
 * @return {[type]}   [description]
 */
(function($)
{
    // plugin definition
    $.fn.FocalPoint = function(options)
    {
        function calculatePosition(cont, img, p2)
        {
            // get the width and height of the container
            var _cw = cont.width();
            var _ch = cont.height();
            // if the p2 going to move the image in a way
            // that there will be negative space, we need to modify
            // the target point so that it will fill the container
            var _xMin = _cw/2;
            var _xMax = img.width() - _cw/2;
            var _yMin = _ch/2;
            var _yMax = img.height() - _ch/2;
            // get the center of the image
            var p1 = {x:img.width()/2, y:img.height()/2};
            // x
            if(p2.x === undefined) p2.x = p1.x;
            if(p2.x < _xMin) p2.x = _xMin;
            if(p2.x > _xMax) p2.x = _xMax;
            // y
            if(p2.y === undefined) p2.y = p1.y;
            if(p2.y < _yMin) p2.y = _yMin;
            if(p2.y > _yMax) p2.y = _yMax;
            // get hypotenuse
            var h = Math.hypot(p1.x-p2.x, p1.y-p2.y);
            // get angle in radians
            var a = Math.atan2(p1.y-p2.y, p1.x-p2.x);
            // translate 
            var nx = h * Math.cos(a);
            var ny = h * Math.sin(a);
            // difference between container and image centers
            var dx = (_cw-img.width())/2;
            var dy = (_ch-img.height())/2;
            // get offset with container
            var offset = {
                x : nx+dx,
                y : ny+dy
            };
            return {img:img, offset:offset};
        }

        function move(calc, anim_obj)
        {
            if(anim_obj.animate)
            {
                calc.img.animate({
                    "left" : calc.offset.x+"px",
                    "top"  : calc.offset.y+"px"
                },anim_obj.options);
            }
            else
            {
                calc.img.css({
                    "left" : calc.offset.x+"px",
                    "top"  : calc.offset.y+"px"
                });
                // call the animation complete function if set.
                if(anim_obj.options.complete !== undefined) anim_obj.options.complete();
            }
        }

        return this.each(function()
        {
            // Extend default options with passed options.
            // First argument to exend is an empty object
            // this keeps it from overriding the "defaults" object
            var opts = $.extend({}, $.fn.FocalPoint.defaults, options);
            var elem = $(this);
            var winW = $(window).width();
            // check for an image
            if(elem.children("img").length !== 1)
            {
                throw(new Error("There needs to be exactly 1 child image element."));
            }
            var img = elem.children("img").eq(0).css("position","absolute");
            // initial call to move function
            // note that animate is set to false for the initial call to prevent it from animating into place
            // which seemed awkward. The intial positioning should be immediate.
            move(calculatePosition(elem, img, {x:opts.x, y:opts.y}), {animate:false, options:opts.animateOptions});
            // updates position when window resize finishes.
            // This prevents the position logic from being calculated during resize
            // which results in a lot of unnecessary processing.
            var resizeTimer;
            $(window).on("resize", function()
            {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function()
                {
                    if(($(window).width() > winW) && !opts.animateOnExpand)
                    {
                        move(calculatePosition(elem, img, {x:opts.x, y:opts.y}), {animate:false, options:opts.animateOptions});
                    }
                    else
                    {
                        move(calculatePosition(elem, img, {x:opts.x, y:opts.y}), {animate:opts.animate, options:opts.animateOptions});
                    }
                    winW = $(window).width();
                },100);
            });
        });
    };
    // default settings
    $.fn.FocalPoint.defaults = {
        x               : undefined,
        y               : undefined,
        animate         : true,
        animateOnExpand : false,
        animateOptions  : {}
    };


})(jQuery);