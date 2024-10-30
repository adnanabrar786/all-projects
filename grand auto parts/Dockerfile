FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn prisma:generate

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
