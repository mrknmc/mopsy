var gulp = require('gulp');
var useref = require('gulp-useref');


gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe(useref.assets())
               .pipe(useref.restore())
               .pipe(useref())
               .pipe(gulp.dest('dist'));
});
