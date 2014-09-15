var gulp = require('gulp');
var connect = require('gulp-connect');


gulp.task('connect', connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));
