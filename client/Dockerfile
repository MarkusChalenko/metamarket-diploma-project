#FROM node:16.15
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN yarn
#
#COPY . .
#
#RUN yarn build
#CMD yarn start

FROM node:16.15-alpine3.15

WORKDIR /app

COPY package*.json /app/
RUN yarn

COPY app /app/app
COPY pages /app/pages
COPY public /app/public
COPY next-env.d.ts next.config.js postcss.config.js \
  tailwind.config.js tsconfig.json /app/

RUN yarn build
CMD yarn start
