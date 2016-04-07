var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    plumber   = require('gulp-plumber'),
    postcss   = require('gulp-postcss'),
    reporter  = require('postcss-reporter'),
    stylelint = require('stylelint'),
    sassLint  = require('gulp-sass-lint');

gulp.task('default', () => {
    gulp.watch(['**/*.scss','!node_modules/**'], () => {
        gulp.src('web/css/*.scss')
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(
                sass({
                    outputStyle   : 'expanded',
                    sourceComments: true
                })
                .on('error', sass.logError)
            )
            .pipe(gulp.dest('web/css'));
    });
});

gulp.task('scss-lint', () => {
    return gulp.src(['**/*.scss','!node_modules/**'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('watch-scss-lint', () => {
    gulp.watch(['**/*.scss','!node_modules/**'], event => {
        gulp.src(event.path)
        .pipe(sassLint())
        .pipe(sassLint.format());
    });
});

gulp.task('sass', () => {
    return gulp.src('web/css/*.scss')
        .pipe(
            sass({
                outputStyle   : 'expanded',
                sourceComments: true
            })
        )
        .pipe(gulp.dest('web/css'));
});

gulp.task('css-lint', () => {
    return gulp.src('web/css/*.css')
        .pipe(postcss([
            stylelint(),
            reporter({
                clearMessages: true,
                throwError   : true
            })
        ]));
});
