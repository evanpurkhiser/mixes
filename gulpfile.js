'use strict';

var gulp       = require('gulp'),
    plumber    = require('gulp-plumber'),
    stylus     = require('gulp-stylus'),
    connect    = require('gulp-connect'),
    clean      = require('gulp-clean'),
    deploy     = require('gulp-gh-pages'),
    browserify = require('gulp-browserify');

var buildDir = 'build';

gulp.task('index', function()
{
    return gulp.src('src/index.html').pipe(gulp.dest(buildDir));
});

gulp.task('css', function()
{
    return gulp.src('src/css/screen.styl')
        .pipe(stylus())
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', function()
{
    return gulp.src('src/js/application.js')
        .pipe(plumber())
        .pipe(browserify({transform: ['browserify-hogan']}))
        .pipe(gulp.dest(buildDir));
});

gulp.task('watch', function()
{
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/css/**/*.styl', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('serve', function()
{
    return connect.server({root: buildDir, port: 8000});
});

gulp.task('clean', function()
{
    return gulp.src('build', {read: false}).pipe(clean())
});

gulp.task('deploy', function()
{
    return gulp.src('build/**/*').pipe(deploy());
});

gulp.task('build',   ['index', 'css', 'js'])
gulp.task('default', ['serve', 'watch']);
