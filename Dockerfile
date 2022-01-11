FROM node:16 AS frontend

RUN npm install -g typescript@4.5.4

WORKDIR /frontend

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

COPY ./frontend/tsconfig.json ./
COPY ./frontend/src/ ./src/
COPY ./frontend/public/ ./public/

RUN npm install .
RUN npm run build


FROM node:16 AS backend

WORKDIR /backend

COPY ./backend/tslint.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/package.json ./
COPY ./backend/package-lock.json ./
COPY ./backend/src/ ./src/

RUN npm install .

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
