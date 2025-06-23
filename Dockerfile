FROM node:22 AS base

ENV NODE_ENV production

COPY package*.json ./

RUN npm install

COPY ..

RUN npm run build

FROM base AS runner

EXPOSE 3000

CMD ["start.sh"]
