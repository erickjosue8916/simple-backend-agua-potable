FROM node:12-alpine as base

WORKDIR /app

FROM base as builder
COPY package.json ./
RUN npm install
COPY . .

CMD ["node", "./src/app.js"]