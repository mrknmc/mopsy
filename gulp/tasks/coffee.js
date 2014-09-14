var gulp = require('gulp');
var coffee = require('gulp-coffee');
var util = require('gulp-util');


gulp.task('coffee', function () {
    return gulp.src(
            ['app/scripts/**/*.coffee', '!app/scripts/**/*.js'],
            {base: 'app/scripts'}
        )
        .pipe(
            coffee({ bare: true }).on('error', util.log)
        )
        .pipe(gulp.dest('app/scripts'));
});
