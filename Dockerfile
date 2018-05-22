FROM node:latest

COPY . /app

RUN cd /app; npm install

EXPOSE 3000

CMD cd /app && node index.js
