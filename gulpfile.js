var gulp       = require('gulp'),
    uglify     = require('gulp-uglifyjs'),
    jscs       = require('gulp-jscs'),
    jshint     = require('gulp-jshint'),
    rename     = require('gulp-rename'),
    console    = require('better-console'),
    lreload    = require('gulp-livereload');



gulp.task('default', function()
{
    lreload.listen();
    gulp.watch([__dirname + '/src/*.*'],['compile']);
});

// Enforce coding standards
gulp.task('jscs',function()
{
    console.clear();
    return gulp.src([__dirname + '/src/**.js']).pipe(jscs());
});

// Lint
gulp.task('lint',['jscs'],function()
{
    return gulp.src([__dirname + '/src/**.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// Uglify and create source map.
gulp.task('compile',['lint'],function()
{
    return gulp.src(__dirname + '/src/**.js')
        .pipe(rename({
            suffix:".min"
        }))
        .pipe(uglify({
            outSourceMap:true,
            mangle:true
        }))
        .pipe(gulp.dest(__dirname + "/dist/"))
        .pipe(lreload());
});