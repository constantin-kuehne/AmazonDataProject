FROM node:16-alpine

ENV NODE_ENV="production"

WORKDIR /server/src

COPY /backend/package.json ./

RUN npm install .

COPY /backend/dist/ ./
COPY /frontend/build/ ./public/

# VOLUME ${PWD}/backend/.env:/server/.env

COPY /backend/config/ ../config/

EXPOSE 3000

CMD ["node", "."]
