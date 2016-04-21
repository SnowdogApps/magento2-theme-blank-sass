var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    plumber     = require('gulp-plumber'),
    postcss     = require('gulp-postcss'),
    reporter    = require('postcss-reporter'),
    stylelint   = require('stylelint'),
    sassLint    = require('gulp-sass-lint'),
    runSequence = require('run-sequence');

gulp.task('default', () => {
    gulp.watch(['**/*.scss','!node_modules/**'], () => {
        runSequence('sass-lint', 'sass', 'css-lint');
    });
});

gulp.task('sass', () => {
    return gulp.src('web/css/*.scss')
        .pipe(
            sass({
                outputStyle   : 'expanded',
                sourceComments: true
            })
            .on('error', sass.logError)
        )
        .pipe(gulp.dest('web/css'));
});

gulp.task('sass-lint', () => {
    return gulp.src(['**/*.scss','!node_modules/**'])
        .pipe(sassLint())
        .pipe(sassLint.format());
});

gulp.task('css-lint', () => {
    return gulp.src('web/css/*.css')
        .pipe(postcss([
            stylelint(),
            reporter({
                clearMessages: true
            })
        ]));
});

gulp.task('ci:sass-lint', () => {
    return gulp.src(['**/*.scss','!node_modules/**'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('ci:sass', () => {
    return gulp.src('web/css/*.scss')
        .pipe(
            sass({
                outputStyle   : 'expanded',
                sourceComments: true
            })
        )
        .pipe(gulp.dest('web/css'));
});

gulp.task('ci:css-lint', () => {
    return gulp.src('web/css/*.css')
        .pipe(postcss([
            stylelint(),
            reporter({
                clearMessages: true,
                throwError   : true
            })
        ]));
});

gulp.task('ci-tests', () => {
    runSequence('ci:sass-lint', 'ci:sass', 'ci:css-lint');
});
