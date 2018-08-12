# External third-party integrations

[Blubrry](https://www.blubrry.com) is used to host each podcast episode. These podcasts are syndicated by multiple other podcast networks, including Apple Podcasts, Android Podcasts, and SoundCloud.

Amazon SES is used to send copies of users' generated and edited stories to them. The credentials for this are AWS credentials, *not* SMTP credentials, and the `node-ses` package is used to simplify querying the SES endpoints. These credentials must be included in `server/credentials/email-credentials.json`. In production, these are stored in `/etc/hellox-credentials/` and volumed into `/etc/hellox-client/server/credentials/` with the Docker runtime voluming argument, `-v`. Critical note: while the server for the web client is located in Frankfurt, SES is not available in that zone. It is instead located in the closest European zone in Ireland.

As designed by the client, a Google Sheet is used to contain all the submitted user-generated stories. The `googleapis` package is used to automate this process, and the necessary credentials are stored within the running container in the `server/credentials/google-sheets-credentials.json` directory. Like the e-mail credentials, these are volumed into the Docker container at runtime from `/etc/hellox-credentials/`.

[Formspree](https://formspree.io) is used for simple contact form e-mails.

[Speakpipe](https://speakpipe.com) is used for simple voice memos.

Note that this does not cover the first-party integrations between the [`Drupal` CMS](https://cms.hellox.me) and the [`Discourse` forum](https://forum.hellox.me). Further information about these is located in the corporate Google Drive and at their [respective](https://github.com/ice-nine-as/hellox-cms) [repositories](https://github.com/ice-nine-as/hellox-forum).