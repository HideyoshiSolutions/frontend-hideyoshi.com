FROM node:22.12-alpine AS base

FROM base AS build

WORKDIR /app

COPY package*.json ./

RUN npm install


FROM base AS prod

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY . .


RUN npm install -g @angular/cli@20.3.8


RUN apk add --update gettext python3 py3-pip py3-setuptools make g++ && \
    rm -rf /var/cache/apk/*

RUN npm run build:prod

EXPOSE 5000-7000

CMD ["npm", "run", "start:prod"]
