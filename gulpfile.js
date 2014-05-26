'use strict';

var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat-sourcemap'),
    connect = require('gulp-connect');

var buildDir = 'build';

gulp.task('sass', function() {
    return gulp.src('src/sass/screen.sass')
        .pipe(sass({outputStyle: 'compressed', errLogToConsole: true}))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);

});

gulp.task('serve', function() {
    connect.server({root: buildDir});
});

gulp.task('default', ['serve', 'watch']);
