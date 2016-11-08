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
    autoprefixer = require('autoprefixer');

var config = {
    ci: gutil.env.ci || false,
    postcss: [
        autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'not ie < 11', 'not OperaMini >= 5.0']
        })
    ]
};

gulp.task('sass', () => {
    return gulp.src('../styles/*.scss')
        .pipe(
            sass({
                outputStyle   : 'expanded',
                sourceComments: true
            })
            /** @see sass.logError had to copy a part of this to generate a legitimate error status code */
            .on('error', sassError(config.ci))
        )
        .pipe(postcss(config.postcss))
        .pipe(gulp.dest('web/css'));
});

gulp.task('sass-lint', () => {
    return gulp.src(['../**/*.scss','!node_modules/**'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(gulpif(config.ci, sassLint.failOnError()));
});

gulp.task('css-lint', () => {
    return gulp.src('../web/css/*.css')
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
