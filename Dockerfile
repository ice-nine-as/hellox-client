FROM node:8.9.4

EXPOSE 3000

# Skips node_modules/ through .dockerignore, given that transferring modules to
# the container is actually significantly slower than downloading them.
COPY . /etc/hellox-client/

WORKDIR /etc/hellox-client/

RUN \
  npm install

CMD [ "npm", "run", "start-h2" ]