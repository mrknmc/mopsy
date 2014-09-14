var gulp = require('gulp');
var size = require('gulp-size');
var connect = require('gulp-connect');
var useref = require('gulp-useref');


gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(size())
        .pipe(connect.reload());
});
