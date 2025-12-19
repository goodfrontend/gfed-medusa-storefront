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
RUN turbo prune --scope=@gfed-medusa/mf-checkout --docker
 
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
RUN mkdir -p /app/apps/mf-checkout/public
 
RUN turbo run build --filter=@gfed-medusa/mf-checkout...
 
FROM base AS runner
WORKDIR /app
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/mf-checkout/next.config.js .
COPY --from=installer /app/apps/mf-checkout/package.json .
 
COPY --from=installer --chown=nextjs:nodejs /app/apps/mf-checkout/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/mf-checkout/.next/static ./apps/mf-checkout/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/mf-checkout/public ./apps/mf-checkout/public

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

CMD node apps/mf-checkout/server.js
