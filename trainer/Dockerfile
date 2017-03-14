FROM node:7.4.0-alpine

#create app folder
RUN mkdir /app
WORKDIR /app

#cache packages
COPY package.json /app/package.json
RUN npm install
RUN npm install -g pm2

#copy app
COPY main.js /app

#run app
ENV RESTART_DELAY 60000
CMD pm2 --no-daemon --restart-delay ${RESTART_DELAY} start main.js
