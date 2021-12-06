FROM node:17-alpine

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin:/home/node/app/node_modules/.bin

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY --chown=node:node . .

CMD ["npm", "start"]