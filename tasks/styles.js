'use strict';

var gulp  = require('gulp');
var sass  = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var $     = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var reload      = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('sass', function () {
  gulp.src('./app/components/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('./app/styles/css'));
  reload();
});

gulp.task('styles', function () {
  gulp.watch('./app/components/**/*.scss', ['sass']);
});
