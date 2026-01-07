#!/bin/bash
set -e

echo "🧪 Testing Integration Tests Workflow Locally"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo ""
echo "📦 Step 1: Installing dependencies..."
pnpm install --frozen-lockfile

# Step 2: Build packages
echo ""
echo "🔨 Step 2: Building packages..."
pnpm build --filter="./packages/**"

# Step 3: Test each MFE
MFEs=("mf-home" "mf-account" "mf-products" "mf-checkout")
FAILED=0

for mfe in "${MFEs[@]}"; do
  echo ""
  echo "🧪 Testing @gfed-medusa/$mfe..."

  # Build
  echo "  - Building..."
  if pnpm build --filter="@gfed-medusa/$mfe" > /tmp/$mfe-build.log 2>&1; then
    echo -e "  ${GREEN}✓${NC} Build passed"
  else
    echo -e "  ${RED}✗${NC} Build failed"
    echo "    Log: /tmp/$mfe-build.log"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Type check
  echo "  - Type checking..."
  if pnpm check-types --filter="@gfed-medusa/$mfe" > /tmp/$mfe-types.log 2>&1; then
    echo -e "  ${GREEN}✓${NC} Type check passed"
  else
    echo -e "  ${RED}✗${NC} Type check failed"
    echo "    Log: /tmp/$mfe-types.log"
    FAILED=$((FAILED + 1))
  fi
done

# Summary
echo ""
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}✗ $FAILED MFE(s) failed${NC}"
  exit 1
fi
