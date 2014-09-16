var gulp = require('gulp');
var coffee = require('gulp-coffee');
var util = require('gulp-util');
var handleErrors = require('../util/handleErrors');


gulp.task('coffee', function () {
    return gulp.src(
            ['app/scripts/**/*.coffee', '!app/scripts/**/*.js'],
            {base: 'app/scripts'}
        )
        .pipe(coffee({bare: true}))
        .on('error', handleErrors)
        .pipe(gulp.dest('app/scripts'));
});
