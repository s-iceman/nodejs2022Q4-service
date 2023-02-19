FROM node:18.14-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

FROM node:18.14-alpine
COPY --from=builder /usr/src/app/ ./
EXPOSE ${PORT}
RUN npm run build && npx prisma generate
CMD ["npm", "run", "start:migrate"]