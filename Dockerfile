FROM node:4.7.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g gulp
RUN npm install --unsafe-perm # suppress UID switching to make postinstall work # TODO: fix by creating an app user

ENV NODE_ENV=production
RUN gulp
