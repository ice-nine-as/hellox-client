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
  minify,
} = require('uglify-js');
const {
  promisify,
} = require('util');

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


gulp.task('minify-vendor', async () => {
  const path = resolve(__dirname, 'dist', 'client', 'vendor.js');
  const text = (await promisify(readFile)(path)).toString();
  const {
    code,
    error,
  } = minify(text);

  await promisify(writeFile)(path, code);
});