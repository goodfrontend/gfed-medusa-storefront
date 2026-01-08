#!/bin/bash
set -e

# Map app name to service name with optional environment suffix
# Usage: ./map-service-name.sh <app> [environment]
# Example: ./map-service-name.sh home smoke
# Output: sf-home-smoke
# Example: ./map-service-name.sh home
# Output: sf-home

APP="$1"
ENV="$2"

if [ -z "$APP" ]; then
  echo "Usage: $0 <app> [environment]" >&2
  echo "  app: home, account, products, checkout" >&2
  echo "  environment (optional): smoke, qa, production" >&2
  exit 1
fi

# Map app name to service name
case "$APP" in
  home) SERVICE="sf-home" ;;
  account) SERVICE="sf-account" ;;
  products) SERVICE="sf-products" ;;
  checkout) SERVICE="sf-checkout" ;;
  *)
    echo "::error::Invalid app: $APP" >&2
    echo "Valid apps: home, account, products, checkout" >&2
    exit 1
    ;;
esac

# Add environment suffix (if provided)
if [ -n "$ENV" ]; then
  case "$ENV" in
    smoke) SERVICE_NAME="$SERVICE-smoke" ;;
    qa) SERVICE_NAME="$SERVICE-qa" ;;
    production) SERVICE_NAME="$SERVICE-prod" ;;
    *)
      echo "::error::Invalid environment: $ENV" >&2
      echo "Valid environments: smoke, qa, production" >&2
      exit 1
      ;;
  esac
else
  SERVICE_NAME="$SERVICE"
fi

# Output for GitHub Actions
if [ -n "$GITHUB_OUTPUT" ]; then
  echo "service_name=$SERVICE_NAME" >> "$GITHUB_OUTPUT"
  echo "service=$SERVICE" >> "$GITHUB_OUTPUT"
fi

# Also print to stdout for direct usage
echo "$SERVICE_NAME"
