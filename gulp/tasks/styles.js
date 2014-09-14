var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var size = require('gulp-size');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/bower_components']
        }))
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(size())
        .pipe(connect.reload());
});
