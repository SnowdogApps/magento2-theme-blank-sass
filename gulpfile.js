var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('default', () => {
  return gulp.src('./**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('compiled'));
});
