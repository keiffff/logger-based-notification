FROM node:18.12.1-alpine AS build-stage

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn build

FROM node:18.12.1-alpine AS production-stage

WORKDIR /app
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/dist ./dist

CMD ["node", "dist/index.js"]
