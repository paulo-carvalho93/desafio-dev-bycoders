FROM node:lts-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
EXPOSE 3333
COPY . .
CMD ["npm", "run", "dev:server"]
