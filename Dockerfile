FROM node:16.14 as builder
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install npm -g
RUN npm install --legacy-peer-deps
RUN npm run build

FROM node:16.14
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/index.js /app/index.js
WORKDIR /app
RUN npm install express
ENTRYPOINT ["node","index.js"]
EXPOSE 8080/tcp
