FROM node:18-alpine

WORKDIR /app

COPY . .

RUN apk add gettext

RUN npm install
RUN npm install -g @angular/cli@16

RUN ng build --configuration=production

EXPOSE 5000-7000
CMD sh -c "envsubst < dist/frontend-hideyoshi.com/assets/env.sample.js > dist/frontend-hideyoshi.com/assets/env.js && npm start"
