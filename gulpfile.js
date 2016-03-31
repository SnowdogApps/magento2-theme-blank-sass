var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    csslint = require('gulp-csslint'),
    gutil   = require('gulp-util');

var cssLintSettings = {
    'adjoining-classes'          : false,
    'box-model'                  : false,
    'box-sizing'                 : false,
    'compatible-vendor-prefixes' : true,
    'empty-rules'                : true,
    'display-property-grouping'  : false,
    'duplicate-background-images': false,
    'duplicate-properties'       : false,
    'fallback-colors'            : false,
    'floats'                     : false,
    'font-faces'                 : true,
    'font-sizes'                 : false,
    'gradients'                  : true,
    'ids'                        : false,
    'import'                     : true,
    'important'                  : false,
    'known-properties'           : true,
    'outline-none'               : true,
    'overqualified-elements'     : false,
    'qualified-headings'         : false,
    'regex-selectors'            : false,
    'shorthand'                  : false,
    'selector-max'               : false, // IE max selectors quantity error
    'selector-max-approaching'   : false, // IE max selectors quantity warning
    'star-property-hack'         : true,
    'text-indent'                : true,
    'underscore-property-hack'   : true,
    'unique-headings'            : false,
    'universal-selector'         : false,
    'unqualified-attributes'     : false,
    'vendor-prefix'              : false,
    'zero-units'                 : true
};

// css lint custom formater
function customReporter(file) {
    gutil.log(
        gutil.colors.cyan(file.csslint.errorCount) + ' errors in '
        + gutil.colors.magenta(file.path)
    );

    file.csslint.results.forEach(function(result) {
        if (result.error.type === 'warning') {
            gutil.log(
                gutil.colors.yellow.bold('[Warining]')
                + gutil.colors.green(' Line: ' + result.error.line)
                + gutil.colors.cyan(' Column: ' + result.error.col) + ' '
                + gutil.colors.magenta(result.error.message) + ' '
                + gutil.colors.gray(result.error.rule.desc) + ' '
                + gutil.colors.red('Browsers: ' + result.error.rule.browsers)
            );
        }
        else {
            gutil.log(
                gutil.colors.red.bold('[' + result.error.type + ']')
                + gutil.colors.green(' Line: ' + result.error.line)
                + gutil.colors.cyan(' Column: ' + result.error.col) + ' '
                + gutil.colors.magenta(result.error.message) + ' '
                + gutil.colors.gray(result.error.rule.desc) + ' '
                + gutil.colors.red('Browsers: ' + result.error.rule.browsers)
            );
        }
    });
}

gulp.task('default', () => {
    gulp.watch('**/*.scss', ['sass']);
});

gulp.task('sass', () => {
    return gulp.src('web/css/*.scss')
        .pipe(sass({
            outputStyle   : 'expanded',
            sourceComments: true
        }).on('error', sass.logError))
        .pipe(gulp.dest('web/css'));
});

gulp.task('lint', () => {
    return gulp.src('web/css/*.css')
        .pipe(csslint(cssLintSettings))
        .pipe(csslint.reporter(customReporter))
        .pipe(csslint.reporter('fail'));
});
