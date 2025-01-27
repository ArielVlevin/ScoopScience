

FROM node:1 AS build


ENV VITE_API_URL="https://api.scoopscience.com/"

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]