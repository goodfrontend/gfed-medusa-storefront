# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat git && \
    corepack enable && \
    corepack prepare pnpm@9.0.0 --activate && \
    pnpm install turbo --global

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@gfed-medusa/mf-horz-components --docker

FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile --shamefully-hoist

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BFF_URL
ARG NEXT_PUBLIC_BASE_URL

ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BFF_URL=$NEXT_PUBLIC_BFF_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN turbo run build --filter=@gfed-medusa/mf-horz-components...

FROM base AS prod-deps
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install --frozen-lockfile --prod

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejsuser
USER nodejsuser

COPY --from=installer /app/apps/mf-horz-components/package.json .
COPY --from=installer /app/apps/mf-horz-components/dist ./dist
COPY --from=installer /app/apps/mf-horz-components/build ./build

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/apps/mf-horz-components/node_modules ./apps/mf-horz-components/node_modules

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

EXPOSE 4001

CMD ["node", "dist/index.js"]
