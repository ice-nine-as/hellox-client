# First steps for new developers

1. If you've never developed software, or never developed Node.js software before, you'll need to install a few applications first.
    * `Git`, a source control system, can be downloaded [here](https://git-scm.com). This is used to keep different development branches separate from the live master branch, and also to create backups of every published state of the website.
    * Node.js, the programming language and execution environment for the project, can be downloaded [here](https://nodejs.org/en/). Note that this website was developed on Node major version 8, so using later versions may result in unexpected behavior. 
2. Open the `Git Bash` application or your preferred shell.
3. Execute the following command: `git clone https://github.com/ice-nine-as/hellox-client %installdir%`, where `%installdir%` should be replaced with the path at which you'd like to copy the repository. This will create a new directory with the project contents in it.
4. Use the `cd` command with the same value used previously for `%installdir%` to navigate to the copied directory.
5. Use `npm install` to install all Node dependencies. This may take a while, as the process needs to install tens of thousands of files.
6. Use `git checkout dev` to check out the `dev` branch. Note that, if multiple people are developing the website at the same time, or if you're not the lead dev, it would be wise to use (or create) a separate development branch for yourself.
    * If you want to create a new branch, the syntax is slightly different than checking out an already-existing one.  You can do this with `git checkout -b %NEW_BRANCH%`, where `%NEW_BRANCH%` should be replaced with the desired name.
    * Try to use a short and illustrative name for branches. If you're working on adding a specific feature or improving a specific aspect of the website, 
7. Use `npm test` to ensure that the head of the branch is meeting all tests. Any failures will need to be fixed before the webserver will update.
8. There are several options for starting the webserver.
    * Use `npm run start-dev` to start a hot-reloading development server which will automatically reflect the changes saved in source files. This will be running locally on port `3000`. To view it, navigate a browser of your choice to `localhost:3000`.
    * Use `npm run start-prod` to run a production version of the app. This will be also be running locally on port `3000`.
        * Note that running the production build locally results in page caching, which can have serious and confusing effects on your ability to view new development changes. If you happen to do this by accident, or need to test the production build locally at any point, ensure that you clear the page cache from your browser.
        * Note also that live-reloading is disabled in the production build, and error messages will be truncated and/or generic, so it is not a good fit for many cases beyond simple functionality or performance testing.
    * Use `npm run start-h2` to run a high-performance, HTTP2 version of the website on the production server. Note that this requires a `letsencrypt` installation on the server, and voluming or symlinking of the keys into a virtual `private/` directory within the project folder. Currently, this is accomplished through Docker's runtime voluming `-v` argument.
9. Before making any changes, see `documentation/making-changes.md`.
