# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    pnpm install turbo --global
 
FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY . .
RUN turbo prune --scope=@gfed-medusa/mf-horz-components --docker
 
FROM base AS installer
WORKDIR /app
 
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install \
    --frozen-lockfile \
    --shamefully-hoist \
    --network-concurrency=1 \
    --child-concurrency=1
 
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
 
RUN turbo run build --filter=@gfed-medusa/mf-horz-components...
 
FROM base AS runner
WORKDIR /app
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejsuser
USER nodejsuser
 
COPY --from=installer /app/apps/mf-horz-components/package.json .
COPY --from=installer /app/apps/mf-horz-components/dist ./dist
COPY --from=installer /app/apps/mf-horz-components/build ./build

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/mf-horz-components/node_modules ./apps/mf-horz-components/node_modules

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
 
EXPOSE 4001

CMD ["node", "dist/index.js"]
