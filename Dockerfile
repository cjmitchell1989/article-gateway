FROM node:14.16.0

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY ./src ./src

RUN npm ci

ENV NODE_ENV='production'

CMD ["node", "./src/"]