FROM node:22-alpine AS base

ENV NODE_ENV production

COPY package*.json ./

RUN npm install -y

COPY . .

RUN npm run build

FROM base AS runner

EXPOSE 3000

CMD ["start.sh"]
