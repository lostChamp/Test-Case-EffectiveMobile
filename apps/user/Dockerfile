FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package*.json", "project.json", "*.env", "*config*","./"]
COPY ./apps/user ./apps/user
COPY ./libs ./libs

RUN npm install \
    && npm install -g nx

RUN npx nx run user:build:production
CMD node dist/apps/user/main.js
