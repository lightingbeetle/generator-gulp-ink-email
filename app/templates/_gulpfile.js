'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

<% if (jade) { %>var jade = require('gulp-jade');<% } %>

<% if (sass) { %>var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');<% } else { %>
var concat = require('gulp-concat');<% } %>
var inlineCss = require('gulp-inline-css');
var inlineSource = require('gulp-inline-source');

var rename = require('gulp-rename');

<% if (sass) { %>
gulp.task('styles', function() {
  return rubySass('app/styles/scss/main.scss', {
      sourcemap: false,
      style: 'expanded',
      lineNumbers: true
    })
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./app/styles'))
    .pipe(reload({stream: true}));
});
<% } else { %>
gulp.task('styles', function() {
  return gulp.src('app/styles/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('/app'))
    .pipe(reload({stream: true}));
}); 
<% } %>

gulp.task('inline', ['styles'<% if (jade) { %>, 'jade'<% } %>], function() {
  return gulp.src('app/index.html')
    .pipe(inlineSource({
      rootpath: 'app'
    }))
    .pipe(inlineCss({
      preserveMediaQueries: true
    }))
    .pipe(gulp.dest('dist/'));
});

<% if (jade) { %>
gulp.task('jade', function() {
  return gulp.src('app/template/*.jade')
    .pipe(jade({
      pretty: true,
      compileDebug: true
    }))
    .pipe(gulp.dest('app/'));
});
<% } %>

gulp.task('clean', require('del').bind(null, 'dist'));

gulp.task('build', ['clean','inline']);

gulp.task('serve', ['styles'<% if (jade) { %>, 'jade'<% } %>], function() {
  browserSync({
    server: './app',
    notify: false,
    debugInfo: false,
    host: 'localhost'
  });

  gulp.watch('app/styles/*.<% if (sass) { %>s<% } %>css', ['styles']);
  gulp.watch('app/*.html').on('change', reload);
  <% if (jade) { %>gulp.watch('app/template/**/*.jade', ['jade']);<% } %>
});

gulp.task('serve:dist', ['inline'], function() {
  browserSync({
    server: './dist',
    notify: false,
    debugInfo: false,
    host: 'localhost'
  });
});