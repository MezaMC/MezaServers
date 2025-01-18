FROM node:22

WORKDIR /usr/src/app

COPY ./app/* .

EXPOSE 3000

CMD ["node", "--env-file=.env", "./server/index.mjs"]
