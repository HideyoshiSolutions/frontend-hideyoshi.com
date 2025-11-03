FROM node:22.12-alpine AS base

# set a working dir in the base image so all stages inherit it
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

# Dependency stage: cache node_modules by only copying package files first
FROM base AS deps
# copy package manifests first so this layer is cached when source files change
COPY package*.json ./
# if you have a lockfile, copy it too (better reproducibility & cacheability)
COPY package-lock.json ./
# Use npm ci for deterministic installs and faster caching
RUN npm ci --prefer-offline --no-audit --no-fund

# Build stage: only run the build after deps layer is ready
FROM deps AS build
# copy the rest of the source
COPY . .
RUN npm run build:prod

# Production stage: keep the final image small and only include what's necessary
FROM node:22.12-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# copy production node_modules from the deps stage (they include prod + dev if needed for build)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./
COPY --from=build /app/set_env.js ./
COPY --from=build /app/package*.json ./

# expose single well-known port instead of a wide range
EXPOSE 5000

CMD ["npm", "run", "start:prod"]
