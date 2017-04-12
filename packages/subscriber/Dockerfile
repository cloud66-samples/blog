FROM node:6.10.1-alpine

ENV APP_HOME /app
ENV APP_NAME subscriber
RUN mkdir -pv $APP_HOME
WORKDIR $APP_HOME

ENV NPM_CONFIG_LOGLEVEL warn
ENV CONFIG='./src/config'

COPY $APP_NAME/package.json $APP_HOME/package.json
RUN npm install

COPY $APP_NAME/. $APP_HOME
COPY config.js $APP_HOME/src/config.js

CMD node index.js