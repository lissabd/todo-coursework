FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production=false

COPY tsconfig*.json ./
COPY src ./src
COPY .env* ./

RUN mkdir -p uploads/avatars

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir -p uploads/avatars

COPY .env .env

EXPOSE 8000
CMD ["node", "dist/main"]
