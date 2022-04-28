FROM node:17.6.0


WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]