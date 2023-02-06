FROM node

WORKDIR /app

COPY . .
RUN npm install
RUN npm install -g @angular/cli@14.0.6


EXPOSE 5000-7000
CMD ng build --configuration=production && npm start