#!/bin/bash
set -e

echo "🔍 Testing GitHub Actions Workflows"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FAILED=0

# Step 1: Check if tools are installed
echo ""
echo "📋 Step 1: Checking if linters are installed..."

if ! command -v yamllint &> /dev/null; then
  echo -e "  ${RED}✗${NC} yamllint not found"
  echo "    Install: brew install yamllint"
  FAILED=$((FAILED + 1))
else
  echo -e "  ${GREEN}✓${NC} yamllint installed"
fi

if ! command -v actionlint &> /dev/null; then
  echo -e "  ${RED}✗${NC} actionlint not found"
  echo "    Install: brew install actionlint"
  FAILED=$((FAILED + 1))
else
  echo -e "  ${GREEN}✓${NC} actionlint installed"
fi

if [ $FAILED -ne 0 ]; then
  echo ""
  echo -e "${RED}Please install missing tools before continuing${NC}"
  exit 1
fi

# Step 2: Run yamllint
echo ""
echo "📝 Step 2: Validating YAML syntax..."

if yamllint .github/workflows/*.yaml > /tmp/yamllint.log 2>&1; then
  echo -e "  ${GREEN}✓${NC} YAML syntax is valid"
else
  echo -e "  ${RED}✗${NC} YAML syntax errors found"
  echo "    Log: /tmp/yamllint.log"
  cat /tmp/yamllint.log
  FAILED=$((FAILED + 1))
fi

# Step 3: Run actionlint
echo ""
echo "🔍 Step 3: Validating workflow logic..."

if actionlint .github/workflows/*.yaml > /tmp/actionlint.log 2>&1; then
  echo -e "  ${GREEN}✓${NC} Workflow logic is valid"
else
  echo -e "  ${RED}✗${NC} Workflow logic errors found"
  echo "    Log: /tmp/actionlint.log"
  cat /tmp/actionlint.log
  FAILED=$((FAILED + 1))
fi

# Summary
echo ""
echo "===================================="
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All workflow tests passed!${NC}"
  echo ""
  echo "Your workflows are:"
  echo "  ✓ Syntactically correct"
  echo "  ✓ Logically valid"
  echo "  ✓ Ready to push"
  exit 0
else
  echo -e "${RED}✗ $FAILED check(s) failed${NC}"
  echo ""
  echo "Fix the issues above before pushing workflows"
  exit 1
fi
