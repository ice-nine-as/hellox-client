FROM node:8.9.4

RUN \
  git clone https://github.com/ice-nine-as/X50 /etc/X50-client && \
  cd /etc/X50-client && \
  npm install && \
  npm run start-prod