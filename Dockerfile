FROM node:20-alpine

WORKDIR /app

# Copy auto-generated .npmrc file
COPY .npmrc ./

ENTRYPOINT ["/app/scripts/docker_entrypoint.sh"]
CMD ["pnpm", "run", "start:server"]

# Install pnpm
RUN npm install --global pnpm

RUN set -ex ;\
    apk add --no-cache bash bind-tools
COPY  . .

# Install packages
RUN pnpm fetch

RUN pnpm install --prefer-offline

RUN pnpm run build
RUN mv build/assets/*.js.map .
