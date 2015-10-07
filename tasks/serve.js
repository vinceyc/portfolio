'use strict';

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var php         = require('gulp-connect-php');
var browserSync = require('browser-sync');
var babel       = require('gulp-babel');

var reload      = browserSync.reload;

// Watch Files For Changes & Reload
gulp.task('serve', ['styles', 'watchify', 'php'], function () {
  browserSync({
    proxy: 'wip/',
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK'
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
  });

  // gulp.watch(['app/*.html'], reload);
  gulp.watch(['app/index.php'], reload);
  gulp.watch(['app/styles/css/style.css'], reload);
  // gulp.watch(['app/**/*.js']);
  // gulp.watch(['app/**/*.js'], ['jshint']);
  gulp.watch(['app/**/*.js'], reload);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['build'], function () {
  browserSync({
    proxy: 'wip',
    notify: false,
    logPrefix: 'WSK'
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
  });
});

gulp.task('php:dist', function() {
  php.server({ base: 'dist', port: 8001, keepalive: true});
});

gulp.task('php', function() {
  php.server({ base: 'app', port: 8001, keepalive: true});
});
