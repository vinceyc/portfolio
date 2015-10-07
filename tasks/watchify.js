'use strict';

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var source      = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var browserify  = require('browserify');
var watchify    = require('watchify');
var reactify    = require('reactify');
var stringify   = require('stringify');
var babelify   = require('babelify');

gulp.task('watchify', function(){

  var bundler = watchify(
    browserify({debug : true})
      .transform(babelify)
      .transform(stringify(['.hjs', '.html', '.tpl']))
      .transform(reactify)
      .require(require.resolve('../app/main.js'), { entry: true }),
    {
      basedir: '/app/', // (roots __dirname)
      debug: true
    }
  );

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', $.notify.onError({
        message: 'watchify error: <%= error.message %>'
      }))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest( global.dist ? 'dist/scripts' : './app/build/' ))
      .pipe(reload({stream: true, once: true}));
  };
  // rebundle on change
  bundler.on('update', bundle);
  return bundle();
});