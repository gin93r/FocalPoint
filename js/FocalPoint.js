!function(t){t.fn.FocalPoint=function(i){function n(t,i,n){var o=t.width(),e=t.height(),a=o/2,s=i.width()-o/2,x=e/2,h=i.height()-e/2,d={x:i.width()/2,y:i.height()/2};void 0===n.x&&(n.x=d.x),n.x<a&&(n.x=a),n.x>s&&(n.x=s),void 0===n.y&&(n.y=d.y),n.y<x&&(n.y=x),n.y>h&&(n.y=h);var f=Math.hypot(d.x-n.x,d.y-n.y),y=Math.atan2(d.y-n.y,d.x-n.x),m=f*Math.cos(y),c=f*Math.sin(y),p=(o-i.width())/2,l=(e-i.height())/2,r={x:m+p,y:c+l};return{img:i,offset:r}}function o(t,i){i.animate?t.img.animate({left:t.offset.x+"px",top:t.offset.y+"px"},i.options):(t.img.css({left:t.offset.x+"px",top:t.offset.y+"px"}),void 0!==i.options.complete&&i.options.complete())}return this.each(function(){console&&console.log(this);var e=t.extend({},t.fn.FocalPoint.defaults,i),a=t(this),s=t(window).width();if(1!==a.children("img").length)throw new Error("There needs to be exactly 1 child image element.");var x=a.children("img").eq(0).css("position","absolute");o(n(a,x,{x:e.x,y:e.y}),{animate:!1,options:e.animateOptions});var h;t(window).on("resize",function(){clearTimeout(h),h=setTimeout(function(){t(window).width()>s&&!e.animateOnExpand?o(n(a,x,{x:e.x,y:e.y}),{animate:!1,options:e.animateOptions}):o(n(a,x,{x:e.x,y:e.y}),{animate:e.animate,options:e.animateOptions}),s=t(window).width()},100)})})},t.fn.FocalPoint.defaults={x:void 0,y:void 0,animate:!0,animateOnExpand:!1,animateOptions:{}}}(jQuery);
//# sourceMappingURL=FocalPoint.js.map