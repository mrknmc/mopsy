var gulp = require('gulp');
var browserify = require('gulp-browserify');
var size = require('gulp-size');
var connect = require('gulp-connect');


gulp.task('scripts', function () {
    return gulp.src('app/scripts/app.js')
        .pipe(browserify({
            insertGlobals: true,
            transform: ['reactify']
        }))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(size())
        .pipe(connect.reload());
    });
