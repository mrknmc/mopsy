var gulp = require('gulp');
var clean = require('gulp-clean');


gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe(clean());
});
