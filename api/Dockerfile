FROM node:7.4.0-alpine

#create app folder
RUN mkdir /app
WORKDIR /app

#cache packages
COPY package.json /app/package.json
RUN npm install

#copy app
COPY main.js /app

#run app
CMD node main.js
