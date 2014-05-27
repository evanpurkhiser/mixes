'use strict';

var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    bower       = require('gulp-bower-files'),
    concat      = require('gulp-concat-sourcemap'),
    connect     = require('gulp-connect'),
    filter      = require('gulp-filter'),
    clean       = require('gulp-clean'),
    streamQueue = require('streamqueue');

var buildDir = 'build',
    cssPaths = [];

gulp.task('index', function() {
    return gulp.src('src/index.html').pipe(gulp.dest(buildDir));
});

gulp.task('css', function() {
    return gulp.src('src/css/screen.styl')
        .pipe(stylus({include: cssPaths}))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', function() {
    return streamQueue({objectMode: true})
        .queue(bower().pipe(filter('**/*.js')))
        .queue(gulp.src('src/js/**/*.js'))
        .done()
        .pipe(concat('app.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/css/**/*.styl', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('serve', function() {
    return connect.server({root: buildDir, port: 8000});
});

gulp.task('clean', function() {
    return gulp.src('build', {read: false}).pipe(clean())
});

gulp.task('build',   ['index', 'css', 'js'])
gulp.task('default', ['serve', 'watch']);
