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
  console.log('copyManifest task complete.');
};

module.exports.copyManifest = copyManifest;

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
  await dockerUp();
  console.log('dockerRebuild task complete.');
};

const dockerUp = async () => {
  await dockerClean();
  await dockerBuild();
  await dockerRun();
  console.log('dockerUp task complete.');
};

module.exports.dockerRebuild = dockerRebuild;

const dockerStart = async () => {
  console.log(`Starting ${containerName} container.`);
  await promisify(exec)(`docker start ${containerName}`);
  console.log(`Started ${containerName} container.`);
  console.log('dockerStart task complete.');
}

module.exports.dockerStart = dockerStart;

const dockerStop = async () => {
  console.log(`Stopping ${containerName} container.`);
  await promisify(exec)(`docker stop ${containerName}`);
  console.log(`Stopped ${containerName} container.`);
  console.log('dockerStop task complete.');
};

module.exports.dockerStop = dockerStop;

const dockerRun = async () => {
  console.log(`Running ${containerName} container.`);
  await promisify(exec)('docker run ' +
                        /* Run the process on a separate thread from the shell. */
                        '-d ' +
                        /* Call the container hellox-client. */
                        `--name  ${containerName} ` +
                        /* Expose port 3001 on the container as port 80 on the
                         * host machine. */
                        '-p 80:3001 ' +
                        /* Expose port 3000 on the container as port 443 on the
                         * host machine. */
                        '-p 443:3000 ' +
                        /* Volume in keys for HTTPS. */
                        '-v /etc/letsencrypt/:/etc/hellox-client/private/ ' +
                        /* Volume in credentials for e-mail and Drive Sheets
                         * publishing. */
                        '-v /etc/hellox-credentials/:/etc/hellox-client/server/credentials/ ' +
                        /* Run the icenineas/hellox-client image. */
                        'icenineas/hellox-client');

  console.log(`Ran ${containerName} container.`);
  console.log('dockerRun task complete.');
};

module.exports.dockerRun = dockerRun;