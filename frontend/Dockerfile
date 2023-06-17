FROM node:18

WORKDIR /frontend

RUN npm install -g @angular/cli

COPY package*.json .

RUN npm install

COPY . .

# ENV PORT=4200

# EXPOSE $PORT

CMD ["npm", "run", "dev"]