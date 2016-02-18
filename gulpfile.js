var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    plumber = require('gulp-plumber');

gulp.task('default', () => {
  gulp.watch('**/*.scss', ['sass']);
});

gulp.task('sass', () => {
  return gulp.src('css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('compiled'));
});
