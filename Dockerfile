FROM node:18-alpine

WORKDIR /app

COPY . .

RUN apk add --update gettext python3 py3-pip py3-setuptools make g++ && \
    rm -rf /var/cache/apk/*

RUN npm install
RUN npm install -g @angular/cli@16

RUN npm run build:prod

EXPOSE 5000-7000
CMD ["npm", "run", "start:prod"]
