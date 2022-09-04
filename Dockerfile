FROM node

WORKDIR /app

COPY . .
RUN npm install


EXPOSE 5000
ENTRYPOINT ["node", "server.js"]