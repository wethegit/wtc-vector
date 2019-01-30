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
    jsdoc         = require("gulp-jsdoc3"),
    webserver     = require('gulp-webserver');

var files     = {
    es6       : [{
      entries: './demo/run.js',
      output: './demo'
    }, {
      entries: './demo/addition/run.js',
      output: './demo/addition'
    }, {
      entries: './demo/unit-vectors/run.js',
      output: './demo/unit-vectors'
    }, {
      entries: './demo/linear-transformations/run.js',
      output: './demo/linear-transformations'
    }, {
      entries: './demo/matrix-multiplication/run.js',
      output: './demo/matrix-multiplication'
    }, {
      entries: './demo/snowflake/run.js',
      output: './demo/snowflake'
    }],
    jsdoc     : {
      src: './src/*.js',
      opt: './doc'
    },
    watch     : [
      'src/wtc-vector.js',
      'demo/app/VectorPlayground.js',
      'demo/app/DrawingVector.js'
    ]
}

gulp.task('build', function() {

  files.es6.forEach(function(entry) {
    var b = browserify({
      entries: entry.entries,
      debug: true
    });

    b.transform("babelify", {presets: ["env"]});
    return b.bundle()
      .pipe(source('pub.js'))
      .pipe(buffer())
      .pipe(gulp.dest(entry.output))
      .pipe(notify('✓ <%= file.relative %> ready.'));
  });

});


/*
  Watch
*/
gulp.task('watch', () => {

  files.es6.forEach(function(entry) {

    let entries = [entry.entries].concat(files.watch);
    gulp.watch(entries, function() {

      var b = browserify({
        entries: entry.entries,
        debug: true
      });


      b.transform("babelify", {presets: ["es2015"]});
      return b.bundle()
        .on('error', function(e) {
          // If you want details of the error in the console
          console.log(e.toString())

          this.emit('end')
        })
        .pipe(source('pub.js'))
        .pipe(buffer())
        .pipe(gulp.dest(entry.output))
        .pipe(notify('✓ <%= file.relative %> ready.'));
    })
  });

  gulp.src('demo')
    .pipe(webserver({
      fallback: 'index.html',
      host: '0.0.0.0',
      port: 1337,
      livereload: true,
      open: 'http://0.0.0.0:1337/'
    }));
});

gulp.task('document', function(cb) {

  var config = require('./jsdoc.json');
  gulp.src(['README.md', './src/**/*.js'], {read: false})
      .pipe(jsdoc(config, cb));
})
