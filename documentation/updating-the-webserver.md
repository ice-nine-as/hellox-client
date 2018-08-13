# Updating the webserver

1. Using the helloX key (issued by AWS, named `helloX.pem`), `ssh` into the webpage server. Use the `ubuntu` username. You can specify the key with the `-i` option, e.g. `ssh -i ~/foo/bar/helloX.pem ubuntu@hellox.me`.
    * You must use the `ubuntu` username. `root` is not available as an ssh username.
    * If there is a problem with the DNS server, use the fully-qualified EC2 domain name or the public IP. These can be found in the EC2 section of AWS. Both of these still use the `ubuntu` username.
2. `cd` to the project directory (`/etc/hellox-client/` at present).
3. Pull changes with `git pull`. Ensure that the `master` branch is being used.
4. If the Docker container is already running (you can check this with `docker ps`), use `gulp dockerRebuild`. If it is not running, use `gulp dockerUp`. It will take several minutes for the the build to complete and the website to be usable again.
5. Check `docker logs hellox-client` and ensure that it contains the lines `HTTP->HTTPS redirector enabled @ http://localhost:3001` and `BUILD COMPLETE -- Listening @ http://localhost:3000`.
    * If these lines are missing, the build either may not have completed, or something may have gone wrong, in which case you should inspect the logs for error messages.
    * If the `BUILD COMPLETE` message appears but the `HTTP->HTTPS redirector` message does not, the website may not be running in HTTPS/HTTP2 mode, or the redirector may not have been activated. Ensure that the `Dockerfile` and/or relevant npm/gulp task is setting the environment variables `NODE_ENV` to `production` and `H2` to `true`.
    * If the log output is especially long, consider piping the output to a text reader like `less` or `more`, e.g. `docker logs hellox-client | less`.
6. Check the [website](https://hellox.me) in an incognito/private browsing window of the browser of your choice. You **must** use an incognito window (or clear the entire page cache), because otherwise a cached version of the page will be loaded and it will be impossible to tell whether the website is live and working correctly.
