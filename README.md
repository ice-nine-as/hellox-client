[![Build Status](https://travis-ci.org/ice-nine-as/hellox-client.svg?branch=master)](https://travis-ci.org/ice-nine-as/hellox-client)

# Hello X

The primary code repository for developing and staging the Hello X multimedia art project.

## First steps for new developers

See `documentation/new-developers.md`.

## Project structure

The project is served through `Express`, it is written in `Typescript` and `React` (with `JSX`), and it uses `Webpack` and `Babel` to bundle and transpile code such that it can run on all recent (>2013) devices with Javascript capabilities. The `universal-react-component` package, and several other packages from the `universal-react` ecosystem, are used to take simultaneous advantage of code-splitting (reducing the time, process, and space expenditures associated with each request) and server-side rendering (enabling the app to work more natively on phones as a progressive web app, and ensuring that semantic content is loaded and read by web crawlers for SEO purposes).

## Adding new webpages to the project

See `documentation/adding-new-pages.md`.

## Updating the webserver

See `documentation/updating-the-webserver.md`.

## External integrations

See `documentation/external-integrations.md`.

## Continuous Integration

The Hello X client uses Travis CI for continuous integration of testing. (Note, however, that it does *not* use continuous delivery. This would be easy to add but has little value at present.) Changes should be committed on a non-master branch,
then a pull request should be made to pull them into the `master` branch. You may need to wait 5-10 minutes and/or refresh before the result of the Travis test run appears on the pull request page. If the tests pass, pull the changes into `master`; if not, add new commits fixing the errors, and repeat the aforementioned steps. Do *not*, except in the most dire circumstances, pull into `master` if tests are failing. 

## Branch structure

There are only three branches currently in use in the X50 repository: `master`, `dev`, and `documentation`. The `dev` branch is used for all pull requests related to code development, `documentation` is used for all pull requests related to documentation. Both branches are pulled into `master`, built and tested on the Travis continuous integration server, and published to AWS, assuming nothing fails, whereupon the changes are reflected in the live version of the app. If multiple developers are working on the project simultaneously, new branches should be created.

## Pull requests

This is a fully private project, not an open-source one, so any pull requests made by someone who's not already working for Ice 9 will be ignored.
