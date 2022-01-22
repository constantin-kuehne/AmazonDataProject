FROM node:16 AS frontend

RUN npm install -g typescript@4.5.4

WORKDIR /frontend

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

RUN npm install .

COPY ./frontend/tsconfig.json ./
COPY ./frontend/public/ ./public/
COPY ./frontend/src/ ./src/

RUN npm run build


FROM node:16 AS backend

WORKDIR /backend

COPY ./backend/package.json ./
COPY ./backend/package-lock.json ./

RUN npm install .

COPY ./backend/tslint.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/src/ ./src/

RUN npm run build 


FROM node:16-alpine

ENV NODE_ENV="production"

WORKDIR /server/src

COPY /backend/config/ ../config/
COPY /backend/package.json ./

COPY --from=backend /backend/dist/ ./
COPY --from=frontend /frontend/build/ ./public/

# VOLUME ${PWD}/backend/.env:/server/.env

EXPOSE 3000

RUN npm install .

CMD ["node", "."]
