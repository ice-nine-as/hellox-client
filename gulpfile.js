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

const imageName     = 'icenineas/hellox-client';
const containerName = 'hellox-client';

const clean = async () => {
  console.log('Cleaning build directories.');
 
  const _rimraf = promisify(rimraf);
  const _mkdir = promisify(mkdir);
  await _rimraf(resolve(__dirname, 'dist'));
  console.log('Build directories cleaned.');

  console.log('Rebuilding dist directory.');
  await _mkdir(resolve(__dirname, 'dist'));
  console.log('Rebuilt dist directory.');

  console.log('Rebuilding dist/client and dist/server directories.');
  await Promise.all([
    _mkdir(resolve(__dirname, 'dist', 'client')),
    _mkdir(resolve(__dirname, 'dist', 'server')),
  ]);

  console.log('Rebuilt dist/client and dist/server directories.');
  console.log('clean task complete.');
};

module.exports.clean = clean;

const copyManifest = async () => {
  console.log('Copying manifest to dist/client.');
  await promisify(copyFile)(
    resolve(__dirname, 'manifest.json'),
    resolve(__dirname, 'dist', 'client', 'manifest.json')
  );

  console.log('Copied manifest to dist/client.');
  console.log('copyManifest task complete');
};

module.exports.copyManifest = copyManifest;

const copyModernizr = async () => {
  const copyFileProm = promisify(copyFile);
  console.log('Copying modernizr-custom.js and modernizr-custom.js.gz to ' +
              'dist/client.');
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

  console.log('Copied modernizr-custom.js and modernizr-custom.js.gz to ' +
              'dist/client.');
  console.log('copyModernizr task complete.');
};

module.exports.copyModernizr = copyModernizr;

const dockerBuild = async () => {
  console.log(`Building ${imageName} image.`);
  await promisify(exec)('docker build -t icenineas/hellox-client ' + __dirname);
  console.log(`Built ${imageName} container.`);
  console.log('dockerBuild task complete.');
};

module.exports.dockerBuild = dockerBuild;

const dockerClean = async () => {
  console.log('Cleaning docker system files.');
  await promisify(exec)('docker system prune -f');
  console.log('Cleaned docker system files.');
  console.log('dockerClean task complete.');
};

module.exports.dockerClean = dockerClean;

const dockerKill = async () => {
  console.log(`Killing ${containerName} container.`);
  await promisify(exec)(`docker kill ${containerName}`);
  console.log(`Killed ${containerName} container.`);
  console.log('dockerKill task complete.');
};

module.exports.dockerKill = dockerKill;

const dockerRebuild = async () => {
  await dockerKill();
  await dockerClean();
  await dockerBuild();
  await dockerRun();
  console.log('dockerRebuild task complete.');
};

module.exports.dockerRebuild = dockerRebuild;

const dockerStart = async () => {
  console.log(`Starting ${containerName} container.`);
  await promisify(exec)(`docker start ${runContainerName}`);
  console.log(`Started ${runContainerName} container.`);
  console.log('dockerStart task complete.');
}

module.exports.dockerStart = dockerStart;

const dockerStop = async () => {
  console.log(`Stopping ${containerName} container.`);
  await promisify(exec)(`docker stop ${runContainerName}`);
  console.log(`Stopped ${containerName} container.`);
  console.log('dockerStop task complete.');
};

module.exports.dockerStop = dockerStop;

const dockerRun = async () => {
  console.log(`Running ${containerName} container.`);
  await promisify(exec)('docker run ' +
                        '-d ' +
                        `--name  ${containerName} ` +
                        '-p 80:3001 ' +
                        '-p 443:3000 ' +
                        '-v /etc/letsencrypt/:/etc/hellox-client/private/ ' +
                        'icenineas/hellox-client');

  console.log(`Ran ${containerName} container.`);
  console.log('dockerRun task complete.');
};

module.exports.dockerRun = dockerRun;