FROM node:18

WORKDIR /backend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3000

EXPOSE $PORT

CMD ["npm", "start"]