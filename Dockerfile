FROM node:18.14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build
EXPOSE ${PORT}
RUN npm run build && npx prisma generate
CMD ["npm", "run", "start:migrate"]