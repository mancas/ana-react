const gulp = require('gulp');
const gutil = require('gulp-util');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const concat = require('gulp-concat');

const runSequence = require('run-sequence');

gulp.task('stylus', (cb) => {
  gulp.src('src/styles/app.styl')
    .pipe(stylus({compress: true, 'include css': true}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('www/css'))
    .on('end', cb);
});

gulp.task('assets', (cb) => {
  gulp.src('src/assets/**')
    .pipe(gulp.dest('www/assets'))
    .on('end', cb);
});

gulp.task('normalize', (cb) => {
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('www/css/libs/normalize/'))
    .on('end', cb);
});

gulp.task('webpack', (cb) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('[webpack]');
    gutil.log('[webpack]', stats.toString({colors: true}));
    cb();
  })
});

gulp.task('watch', () => {
  gulp.watch('src/assets/**', ['assets']);
  gulp.watch('src/styles/**', ['stylus']);
  gulp.watch('src/**/*.js**', ['webpack']);
});

gulp.task('default', (cb) => { runSequence(['stylus', 'assets', 'normalize', 'webpack', 'watch'], cb) });
