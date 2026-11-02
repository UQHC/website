FROM node:18 AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:18-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json ./
COPY --from=build /app/build ./build
RUN yarn install --frozen-lockfile --production

EXPOSE 8090
CMD ["node", "build/index.js"]
