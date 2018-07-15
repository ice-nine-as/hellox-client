const nodeSES = require('node-ses');

function publishToEmail(name, email, carbonCopy, story) {
  /* Should be copied locally for dev, or volumed in with Docker for prod. */
  const credentials = require('./credentials/email-credentials.json');

  const client = nodeSES.createClient({
    amazon: 'https://email.eu-west-1.amazonaws.com',
    key:    credentials.username,
    secret: credentials.password,
  });

  const sesArgs = {
    to:      'helloX@ice-9.no',
    from:    'helloX@ice-9.no',
    subject: `Here's your story, ${name}!`,
    message:
      `Thanks for contributing to the current X story cycle!

      Your input will be read and discussed by the hello X creative team and will help us create the next questions and scenes for current cycle of X stories. This means your ideas help create new characters, scenes, and storylines for this year’s short stories which will be the basis of improvised writers’ jams, live performances, interactive mobile story experiences and books. 
      More ideas, questions, or comments? Your contributions are what it’s all about, so join the artists and scientists of hello X, and other people like yourself, by going to the Meet page at https://forum.hellox.me. Hear the behind-the-scenes discussions at the Ice-9 story laboratory by listening to the hello X podcast at <a href="https://www.helloX.me/podcasts/">https://www.helloX.me/podcasts/</a>.

      Here’s your story so far. 

      ${story} 

      If you want to continue X’s story, send us your writing or even just ideas at <a href="mailto:helloX@ice-9.no">helloX@ice-9.no</a>, or write to the wider hello X community at <a href="https://forum.hellox.me">https://forum.hellox.me</a>. 

      We will send you an invitation when a new part of the story is open for contributions. You can write us here if you do not want to be contacted further.

      Thanks again, 

      Christine Cynn

      hello X director of chaos`.replace(/\n/g, '<br>'),
  };

  if (carbonCopy && email) {
    sesArgs.to = email;
    sesArgs.cc = 'helloX@ice-9.no';
  }

  return new Promise((resolve, reject) => {
    /* Give SES the details and let it construct the message for you. */
    client.sendEmail(sesArgs, (err, data, res) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  })

}

module.exports = {
  publishToEmail,
};