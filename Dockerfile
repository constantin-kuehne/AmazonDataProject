FROM node:16-alpine

ENV BUILD_PATH="/server/src/dist"

RUN npm install -g typescript@4.5.4

WORKDIR /frontend

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

COPY ./frontend/tsconfig.json ./
COPY ./frontend/src/ ./src/
COPY ./frontend/public/ ./public/

RUN npm install .
RUN npm run build

WORKDIR /backend

COPY ./backend/tslint.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/package.json ./
COPY ./backend/package-lock.json ./
COPY ./backend/src/ ./src/

RUN npm install .

RUN npm run build -- --outDir /server/src/

WORKDIR /

RUN rm -rf ./frontend/
RUN rm -rf ./backend/

WORKDIR /server/src

ENV NODE_ENV="production"

COPY ./backend/config/ ../config/
COPY ./backend/package.json ./

VOLUME ./backend/.env:/server/.env

EXPOSE 3000

RUN npm install .

CMD ["node", "."]
