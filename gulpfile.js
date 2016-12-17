/*
  YAY GULP!
  =======================================
  - *Author*          liamegan
  - *email*           liam@wethecollective.com
  - *Created*         2015-08-24 13:39:12
  - *namespace*       .
  - *Requirements*    .
  - *Description*     .
  - *Edited by*       Liam Egan
  - *Edited*          2016-06-21 12:39:20
  - *Version*         0.1
*/
var gulp          = require('gulp'),
    babel         = require('gulp-babel'),
    babelify      = require('babelify'),
    browserify    = require('browserify'),
    buffer        = require('vinyl-buffer'),
    notify        = require('gulp-notify'),
    source        = require('vinyl-source-stream'),
    jsdoc         = require("gulp-jsdoc3");

var files     = {
    es6       : {
      entries: './demo/run.js',
      output: './demo'
    },
    jsdoc     : {
      src: './src/*.js',
      opt: './doc'
    }
}

gulp.task('build', function() {
  var b = browserify({
    entries: files.es6.entries,
    debug: true
  });

  b.transform("babelify", {presets: ["es2015"]});

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest(files.es6.output))
    .pipe(notify('✓ <%= file.relative %> ready.'));
});

gulp.task('document', function(cb) {

  var config = require('./jsdoc.json');
  gulp.src(['README.md', './src/**/*.js'], {read: false})
      .pipe(jsdoc(config, cb));
})
