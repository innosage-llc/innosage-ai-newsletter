#!/bin/bash
set -e

# Gatekeeper: The immune system of the repository.
# This script ensures that no agentic entropy enters the main codebase.

echo "🛡️ Starting Gatekeeper checks..."

# 0. Validate Bash Scripts
echo "⚙️ Validating Bash Scripts..."
bash -n "$(dirname "$0")/init-session.sh"
node -c "$(dirname "$0")/innosage-opal-cli"

# Change to the web directory relative to the script's location
cd "$(dirname "$0")/../web"

# 1. Linting
echo "🔍 Running Lint..."
npm run lint

# 2. Building (Type checking and compilation)
echo "🏗️ Running Build..."
npm run build

# 3. Testing (Parallel execution)
echo "🧪 Running Tests..."
npm run test

echo "✅ Gate Passed! The changes are safe to commit."
