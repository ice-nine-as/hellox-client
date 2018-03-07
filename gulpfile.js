const {
  exec,
} = require('child_process');
const {
  copyFile,
  mkdir,
  readFile,
  writeFile,
} = require('fs');
const gulp = require('gulp');
const {
  resolve,
} = require('path');
const rimraf = require('rimraf');
const {
  promisify,
} = require('util');

gulp.task('clean', async () => {
  const _rimraf = promisify(rimraf);
  const _mkdir = promisify(mkdir);
  await _rimraf(resolve(__dirname, 'dist'));
  await _mkdir(resolve(__dirname, 'dist'));
  await Promise.all([
    _mkdir(resolve(__dirname, 'dist', 'client')),
    _mkdir(resolve(__dirname, 'dist', 'server')),
  ]);
});

gulp.task('copy-manifest', async () => {
  await promisify(copyFile)(
    resolve(__dirname, 'manifest.json'),
    resolve(__dirname, 'dist', 'client', 'manifest.json')
  );
});

gulp.task('copy-modernizr', async () => {
  const copyFileProm = promisify(copyFile);
  await Promise.all([
    copyFileProm(
      resolve(__dirname, 'modernizr-custom.js'),
      resolve(__dirname, 'dist', 'client', 'modernizr.js')
    ),

    copyFileProm(
      resolve(__dirname, 'modernizr-custom.js.gz'),
      resolve(__dirname, 'dist', 'client', 'modernizr.js.gz')
    ),
  ]);
});

gulp.task('docker-build', async () => {
  await promisify(exec)('docker build -t icenineas/hellox-client ' + __dirname);
});

gulp.task('docker-run', async () => {
  await promisify(exec)('docker run ' +
                        '-d ' +
                        '-p 80:3001 ' +
                        '-p 443:3000 ' +
                        '-v /etc/letsencrypt/:/etc/hellox-client/private/ ' +
                        'icenineas/hellox-client');
});