// Import dependencies
const gulp = require('gulp');

// Configure gulp tasks
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const isCssMinify = true;

gulp.task('css', function() {
    console.log('css compiling');
    return gulp.src('./src/scss/**/*.scss')
        .pipe(plumber({errorHandler:notify.onError('Error: <%= error.message %>')}))
        .pipe(sass({outputStyle: isCssMinify ? 'compressed' : 'expanded'}))
        .pipe(postcss([ autoprefixer(['last 2 versions', 'ie >= 11', 'Android >= 5', 'iOS >= 11']) ]))
        .pipe(gulp.dest('./public/css/'));
  });

gulp.task('watcher', function() {
    gulp.watch('src/**/*css')
    .on('change', gulp.series('css'))
    .on('unlink', gulp.series('css'));
});
// gulp.task('default', gulp.series(tasks.clean, tasks.stylesLint, tasks.styles, tasks.copy, tasks.assets));
