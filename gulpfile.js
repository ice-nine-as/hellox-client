const {
  exec,
} = require('child_process');
const {
  copyFile,
  mkdir,
} = require('fs');
const gulp = require('gulp');
const {
  resolve,
} = require('path');
const rimraf = require('rimraf');
const {
  promisify,
} = require('util');

gulp.task('docker-build', async () => {
  await promisify(exec)('docker build -t icenineas/hellox-client ' + __dirname);
});

gulp.task('docker-run', async () => {
  await promisify(exec)('docker run ' +
                        '-d ' +
                        '-p 80:3000 ' +
                        '-p 443:3000 ' +
                        '-v /etc/letsencrypt/:/etc/hellox-client/private/ ' +
                        'icenineas/hellox-client');
});

gulp.task('clean', async () => {
  const _rimraf = promisify(rimraf);
  const _mkdir = promisify(mkdir);
  await _rimraf(resolve(__dirname, 'dist/'));
  await _mkdir(resolve(__dirname, 'dist/'));
  await _mkdir(resolve(__dirname, 'dist/client/'));
  await _mkdir(resolve(__dirname, 'dist/server/'));
});

gulp.task('copy-manifest', async () => {
  await promisify(copyFile)(
    resolve(__dirname, 'manifest.json'),
    resolve(__dirname, 'dist', 'client', 'manifest.json')
  );
});

gulp.task('copy-modernizr', async () => {
  await promisify(copyFile)(
    resolve(__dirname, 'modernizr-custom.js'),
    resolve(__dirname, 'dist', 'client', 'modernizr.js'));
});