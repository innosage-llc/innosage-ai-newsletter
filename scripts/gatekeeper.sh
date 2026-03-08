#!/bin/bash
set -e

# Gatekeeper: The immune system of the repository.
# This script ensures that no agentic entropy enters the main codebase.

echo "🛡️ Starting Gatekeeper checks..."

# Change directory to web/ for the Next.js app
cd web

# 1. Linting (using oxlint for speed if available, fallback to eslint)
echo "🔍 Running Lint..."
npm run lint

# 2. Building (Type checking and compilation)
echo "🏗️ Running Build..."
npm run build

# 3. Testing (Parallel execution)
echo "🧪 Running Tests..."
npm run test

echo "✅ Gate Passed! The changes are safe to commit."
