const gulp = require('gulp');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('clean', () => {
    return del('./build/**/*');
});

gulp.task('scripts', () => {
    return gulp.src(['./app/**/*.ts', '!./app/**/*.d.ts'])
        .pipe(webpack())
        .pipe(rename('required.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('scripts:watch', () => {
    return gulp.watch('./app/**/*.ts', ['build']);
});

gulp.task('styles', () => {
    return gulp.src('./app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('required.css'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('styles:watch', () => {
    return gulp.watch('./app/**/*.scss', ['styles'])
});

gulp.task('build', done => {
    runSequence(
        ['clean'],
        ['scripts', 'styles'],
        done
    );
});

gulp.task('build:watch', done => {
    runSequence(
        ['build'],
        ['scripts:watch', 'styles:watch'],
        done
    );
});

gulp.task('default', ['build']);

