FROM node

WORKDIR /app

COPY . .
RUN npm install


EXPOSE 5000-7000
ENTRYPOINT ["npm", "start"]