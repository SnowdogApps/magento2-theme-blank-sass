var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    plumber   = require('gulp-plumber'),
    gutil     = require('gulp-util'),
    postcss   = require('gulp-postcss'),
    reporter  = require('postcss-reporter'),
    stylelint = require('stylelint'),
    sassLint  = require('gulp-sass-lint');

// Rewrite to YAML and then move to .stylelintrc, b/c JSON don't support comments
var cssStylelintConfig = {
        "rules": {
            "color-no-invalid-hex": true,
            "time-no-imperceptible": true,
            // "declaration-block-no-duplicate-properties": true, // to do - too many errors
            // "declaration-block-no-ignored-properties": true, // to enable in >=5.3.0
            "declaration-block-no-shorthand-property-overrides": true,
            "block-no-empty": true,
            // "selector-no-attribute": true, // to do - too many errors
            "selector-no-id": true,
            "no-unknown-animations": true,
            "no-browser-hacks": [true, {"browsers": "> 1%, last 2 versions, not ie < 11, not OperaMini >= 5.0"}],
            // "no-unsupported-browser-features": [true, {"browsers": "> 1%, last 2 versions, not ie < 11, not OperaMini >= 5.0"}] // to do - too many errors
        }
    };

gulp.task('default', () => {
    gulp.watch(['**/*.scss','!node_modules/**'], ['sass']);
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

gulp.task('css-lint', () => {
    return gulp.src('web/css/*.css')
        .pipe(postcss([
            stylelint(cssStylelintConfig),
            reporter({
                clearMessages: true,
                throwError   : true
            })
        ]));
});

gulp.task('scss-lint', () => {
    return gulp.src(['**/*.scss','!node_modules/**'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});
