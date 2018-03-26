[![Build Status](https://travis-ci.org/ice-nine-as/hellox-client.svg?branch=master)](https://travis-ci.org/ice-nine-as/hellox-client)

# Hello X

The primary code repository for developing and staging the Hello X multimedia art project.

## Installation

If you don't already have Git installed, download it first [here](https://git-scm.com). Install it, then open the `Git Bash` application. Then, type and execute the following command:

`git clone https://github.com/ice-nine-as/hellox-client %installdir%`

where `%installdir%` should be replaced with the path at which you'd like to copy the repository.

Then, use the `cd` command with the same value used previously for `%installdir%` to enter the copied directory, and type the following command to install all Node dependencies:

`npm install`

This may take a while, given the process needs to install tens of thousands of files. Then, once this completes, use the following command to ensure that the cloned project is meeting all tests:

`npm test`

and then, once these all pass, use

`npm run start-dev`

to start a hot-reloading development server which will automatically reflect the changes saved in source files, or

`npm run start-prod`

to run a production version of the app. Both of these servers will be running locally on port `3000`. To view them, navigate your browser to `localhost:3000`.

In order to run a high-performance version of the website on the production server, use:

`npm run start-h2`

Note that this requires a `letsencrypt` installation on the server, and voluming or symlinking of the keys into a virtual private/ directory within the project folder. Currently, this is accomplished through Docker's VOLUME command.

## Updating the server
Using the X50 key (issued by AWS), ssh into the webpage server. Pull any changes with `git pull`.

If the Docker container is already running (you can check this with `docker ps`), use `gulp dockerRebuild`. If it is not running, use `gulp dockerStart && gulp dockerRun`.

It will take several minutes for the container to spin up again, and for the build infrastructure to complete AOT compilation.

## Continuous Integration
The Hello X client uses Travis CI for continuous integration of testing. (Note, however, that it does *not* use continuous delivery. This would be easy to add but has little value at present.) Changes should be committed on a non-master branch,
then a pull request should be made to pull them into the `master` branch. You may need to wait 5-10 minutes and/or refresh before the result of the Travis test run appears on the pull request page. If the tests pass, pull the changes into
`master`; if not, cancel the pull requests, add new commits fixing the errors, and repeat the aforementioned steps. Do *not*, except in the most dire circumstances, pull into `master` if tests are failing. 

## Branch structure

There are only three branches currently in use in the X50 repository: `master`, `dev`, and `documentation`. The `dev` branch is used for all pull requests related to code development, `documentation` is used for all pull requests related to documentation. Both branches are pulled into `master`, built and tested on the Travis continuous integration server, and published to AWS, assuming nothing fails, whereupon the changes are reflected in the live version of the app.

## Project structure

All the significant code in the X50 app is server-side Node/client-side ES5. Non-server code is written in ESNext with ES Modules. The project is served through `Express`, it is written in `Typescript` and `React` (with `JSX`), and it uses `Webpack` and `Babel` to bundle and transpile code such that it can run on all recent devices with Javascript capabilities. The `universal-react-component` package is also used to take simultaneous advantage of code-splitting (reducing the time, process, and space expenditures associated with each request) and server-side rendering (enabling the app to work more natively on phones as a Progressive Web App, and ensuring that semantic content is loaded and read by web crawlers for SEO purposes).

## Pull requests

This is a fully private project, not an open-source one, so any pull requests made by someone who's not already working for Ice 9 will be ignored.