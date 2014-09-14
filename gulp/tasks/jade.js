var gulp = require('gulp');
var connect = require('gulp-connect');
var jade = require('gulp-jade');

gulp.task('jade', function () {
    return gulp.src('app/template/*.jade')
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})
