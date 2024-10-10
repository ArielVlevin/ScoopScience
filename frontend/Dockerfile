

FROM node:alpine AS build


ENV API_URL="https://api.scoopscience.com/api"

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]