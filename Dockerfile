FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm install -g @angular/cli@16


EXPOSE 5000-7000
CMD ng build --configuration=production && npm start
