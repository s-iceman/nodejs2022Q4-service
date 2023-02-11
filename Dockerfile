FROM node:18.14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
RUN npm run build 
CMD ["npm", "run", "start:dev"]