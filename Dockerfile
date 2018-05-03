FROM node:latest

COPY /my-wx-app /app

RUN cd /app; npm install

EXPOSE 3000

CMD cd /app && node index.js
