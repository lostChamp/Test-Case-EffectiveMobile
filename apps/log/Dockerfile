FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/log ./apps/log
COPY ./libs ./libs

RUN npm install \
    && npm install -g nx

RUN npx nx run log:build:production
CMD node dist/apps/log/main.js
