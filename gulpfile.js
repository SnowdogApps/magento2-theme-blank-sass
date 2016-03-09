var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    plumber = require('gulp-plumber');

gulp.task('default', () => {
  gulp.watch('css/test/*.scss', () => {
    gulp.src('css/test/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('css/test/'));
  });
});
