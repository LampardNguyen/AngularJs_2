var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */
var paths = {
    //public
    'DEST': 'app/css',
    'RESOURCES': 'app/sass'
};
gulp.task('build-admin', function() {
    sass(paths.RESOURCES + '/app.scss', {
        style: 'expanded',
        compass: true,
        lineNumbers: true
    }).on('error', function(err) {
        console.error('Error!', err.message);
    }).pipe(gulp.dest(paths.DEST));
});
gulp.task('watch', function() {
    gulp.watch([ paths.RESOURCES + '/**/*.scss'], ['build-admin']);
});