var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    package = require('./package.json');


gulp.task('html', () => {
    return gulp.src(['./src/**/*.html','./src/**/*.php'])
        .pipe(gulp.dest('./app'))
        .pipe(browserSync.stream());
});

gulp.task('css', () => {
    return gulp.src('src/scss/style.scss')
            .pipe(sass({errLogToConsole: true}))
            .pipe(autoprefixer('last 4 version'))
            .pipe(gulp.dest('app/css'))
            .pipe(cssnano())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('src/js/*.js')
          .pipe(jshint('.jshintrc'))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest('app/js'))
          .pipe(uglify())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest('app/js'))
          .pipe(browserSync.stream());
});

gulp.task('ko.js',() => {
  return gulp.src('src/js/ko/**/*.js')
          .pipe(concat('ko.panini-challenge.min.js'))
          .pipe(gulp.dest('app/js/ko'))
          .pipe(browserSync.stream());
});

gulp.task('inject', () => {
  return gulp.src(['./app/*.html','./app/*.php'])
          .pipe(inject(gulp.src(['./app/js/**/*.min.js',
                                 './app/css/**/*.min.css'],
                                 {read: false}), {relative: true}))
          .pipe(gulp.dest('./app'))
          .pipe(browserSync.stream());
});

gulp.task('clean', function () {
  return del('app/**/*');
});

gulp.task('build', gulp.series('html', 'css', 'js', 'ko.js', 'inject'));

gulp.task('watch', function () {
  browserSync.init({
      server: './app'
  });

  gulp.watch("./src/scss/**/*.scss", gulp.series('css','inject'));
  gulp.watch("./src/js/*.js", gulp.series('js','inject'));
  gulp.watch("./src/js/ko/**/*.js", gulp.series('ko.js','inject'));
  gulp.watch(["./src/**/*.html","./src/**/*.php"], gulp.series('html','inject'));
  gulp.watch(["app/**/*"]).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build','watch'));
