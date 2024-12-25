############## BUILDER ######################

FROM node:20.17-slim AS builder

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

############# RUNNNER #######################

FROM node:20.17-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY pnpm-lock.yaml package.json prisma ./

RUN apt-get update -y && apt-get install -y openssl

RUN npm install -g pnpm && pnpm install

CMD ["sh", "-c", "pnpm run prisma:migrate && pnpm run start"]