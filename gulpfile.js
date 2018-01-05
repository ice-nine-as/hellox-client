const gulp = require('gulp');
const { mkdir } = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');
const rimraf = require('rimraf');

gulp.task('clean', async () => {
  const _rimraf = promisify(rimraf);
  const _mkdir = promisify(mkdir);
  await _rimraf(resolve(__dirname, 'dist/'));
  await _mkdir(resolve(__dirname, 'dist/'));
  await _mkdir(resolve(__dirname, 'dist/client/'));
  await _mkdir(resolve(__dirname, 'dist/server/'));
});