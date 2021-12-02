FROM node:17-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

RUN chown -R node /app/node_modules

USER node

COPY . ./

CMD ["npm", "start"]