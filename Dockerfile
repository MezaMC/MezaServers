FROM node:22

WORKDIR /usr/src/app

COPY app/server /usr/src/app/server
COPY app/public /usr/src/app/public
COPY app/nitro.json /usr/src/app/nitro.json
COPY app/.env /usr/src/app/.env

EXPOSE 3000

CMD ["node", "--env-file=.env", "./server/index.mjs"]