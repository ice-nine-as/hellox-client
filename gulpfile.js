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

const containerBuildName = 'icenineas/hellox-client';
const containerRunName   = 'hellox-client';

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
  console.log(`Building ${containerBuildName} container.`);
  await promisify(exec)('docker build -t icenineas/hellox-client ' + __dirname);
  console.log(`Built ${containerBuildName} container.`);
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
  console.log(`Killing ${containerRunName} container.`);
  await promisify(exec)(`docker kill ${containerRunName}`);
  console.log(`Killed ${containerRunName} container.`);
  console.log('dockerKill task complete.');
};

module.exports.dockerKill = dockerKill;

const dockerRebuild = async () => {
  await dockerKill();
  await dockerClean();
  await dockerBuild();
  console.log('dockerRebuild task complete.');
};

module.exports.dockerRebuild = dockerRebuild;

const dockerStart = async () => {
  console.log(`Starting ${containerRunName} container.`);
  await promisify(exec)(`docker start ${runContainerName}`);
  console.log(`Started ${runContainerName} container.`);
  console.log('dockerStart task complete.');
}

module.exports.dockerStart = dockerStart;

const dockerStop = async () => {
  console.log(`Stopping ${containerRunName} container.`);
  await promisify(exec)(`docker stop ${runContainerName}`);
  console.log(`Stopped ${containerRunName} container.`);
  console.log('dockerStop task complete.');
};

module.exports.dockerStop = dockerStop;

const dockerRun = async () => {
  console.log(`Running ${containerRunName} container.`);
  await promisify(exec)('docker run ' +
                        '-d ' +
                        '--name ice-nine-as/hellox-client ' +
                        '-p 80:3001 ' +
                        '-p 443:3000 ' +
                        '-v /etc/letsencrypt/:/etc/hellox-client/private/ ' +
                        'icenineas/hellox-client');

  console.log(`Ran ${containerRunName} container.`);
  console.log('dockerRun task complete.');
};

module.exports.dockerRun = dockerRun;