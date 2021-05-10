FROM node:16-alpine
  WORKDIR /app
  ADD . ./
  RUN npm i
  CMD npm start
