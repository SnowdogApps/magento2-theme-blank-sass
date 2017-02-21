var gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    gutil        = require('gulp-util')
    sass         = require('gulp-sass'),
    sassError    = require('gulp-sass-error').gulpSassError,
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    reporter     = require('postcss-reporter'),
    stylelint    = require('stylelint'),
    sassLint     = require('gulp-sass-lint'),
    runSequence  = require('run-sequence'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps');

var config = {
    ci: gutil.env.ci || false,
    postcss: [
        autoprefixer()
    ]
};

gulp.task('sass', () => {
    return gulp.src('../styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'expanded',
                sourceComments: true
            })
            .on('error', sassError(config.ci))
        )
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(config.postcss))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('styles'));
});

gulp.task('sass-lint', () => {
    return gulp.src(['../**/*.scss','!node_modules/**'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(gulpif(config.ci, sassLint.failOnError()));
});

gulp.task('css-lint', () => {
    return gulp.src('styles/*.css')
        .pipe(postcss([
            stylelint(),
            reporter({
                clearMessages: true,
                throwError: config.ci
            })
        ]));
});

gulp.task('tests', () => {
    runSequence('sass-lint', 'sass', 'css-lint');
});
