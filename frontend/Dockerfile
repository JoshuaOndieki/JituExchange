FROM node:18-alpine as build

WORKDIR /frontend

# RUN npm install -g @angular/cli@16.0.2

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /frontend/dist/jitu-exchange /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
