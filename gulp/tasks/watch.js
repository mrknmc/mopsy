var gulp = require('gulp');
var connect = require('gulp-connect');


gulp.task('connect', connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));


gulp.task('watch', ['clean', 'build', 'connect'], function () {

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);


    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);


    // Watch .jade files
    gulp.watch('app/template/**/*.jade', ['jade', 'html']);



    // Watch .coffeescript files
    gulp.watch('app/scripts/**/*.coffee', ['coffee', 'scripts']);


    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
