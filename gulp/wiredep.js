'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  return gulp.src('src/index.html')
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap.js/, /bootstrap.css/]
    }))
    .pipe(gulp.dest('src'));
});
