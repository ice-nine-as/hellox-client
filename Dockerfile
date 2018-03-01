FROM node:8.9.4

EXPOSE 3000

# Skips node_modules/ through .dockerignore, given that transferring modules to
# the container is actually significantly slower than downloading them.
COPY . /etc/X50-client/

WORKDIR /etc/X50-client/

RUN \
  npm install

CMD [ "npm", "run", "start-prod" ]