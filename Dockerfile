FROM node:22.12-alpine AS base

FROM base AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:prod


FROM base AS prod

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./
COPY --from=build /app/set_env.js ./
COPY --from=build /app/package*.json ./


EXPOSE 5000-7000

CMD ["npm", "run", "start:prod"]
