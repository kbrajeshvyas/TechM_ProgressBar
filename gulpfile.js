var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');

var ngannotate = require('gulp-ng-annotate');
var sassFiles = 'app/css/sass/**/*.scss',  
    cssDest = 'assets/css/';

gulp.task('jshint', function() {
  return gulp.src('app/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function(){  
    gulp.src(sassFiles)
        .pipe(gulp.dest(cssDest));
});

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'copyfonts');
});

gulp.task('usemin',['jshint'], function () {
  return gulp.src('./app/index.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        js: [ngannotate(),uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('{app/js/**/*.js,app/css/**/*.css,app/**/*.html}', ['usemin']);
});

gulp.task('browser-sync', ['default'], function () {
   var files = [
      'app/**/*.html',
      'app/css/**/*.css',
      'app/scripts/**/*.js',
      'dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "index.html"
      }
   });

  gulp.watch(['dist/**']).on('change', browserSync.reload);
    });