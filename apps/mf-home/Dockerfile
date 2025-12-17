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
RUN turbo prune --scope=@gfed-medusa/mf-home --docker
 
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
RUN mkdir -p /app/apps/mf-home/public
 
RUN turbo run build --filter=@gfed-medusa/mf-home...
 
FROM base AS runner
WORKDIR /app
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/mf-home/next.config.js .
COPY --from=installer /app/apps/mf-home/package.json .
 
COPY --from=installer --chown=nextjs:nodejs /app/apps/mf-home/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/mf-home/.next/static ./apps/mf-home/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/mf-home/public ./apps/mf-home/public
 
CMD node apps/mf-home/server.js
