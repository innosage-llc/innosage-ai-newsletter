#!/bin/bash

# scripts/init-session.sh
# Initializes a new session folder for an AI Agent task.

# Ensure a task slug is provided
if [ -z "$1" ]; then
  echo "Error: Task slug is required."
  echo "Usage: ./scripts/init-session.sh <task-slug>"
  echo "Example: ./scripts/init-session.sh implement-dark-mode"
  exit 1
fi

SLUG=$1
DATE=$(date +"%Y-%m-%d")
SESSION_DIR="docs/${DATE}-${SLUG}"

# Create the session directory
mkdir -p "$SESSION_DIR"
echo "Created session directory: $SESSION_DIR"

# Copy the feature spec template if it exists
TEMPLATE_PATH="docs/templates/feature-spec-template.md"
if [ -f "$TEMPLATE_PATH" ]; then
  cp "$TEMPLATE_PATH" "$SESSION_DIR/feature-spec.md"
  echo "Copied feature spec template to: $SESSION_DIR/feature-spec.md"
else
  echo "Warning: Feature spec template not found at $TEMPLATE_PATH. Skipping copy."
fi

# Create an empty rules.md file
touch "$SESSION_DIR/rules.md"
echo "Created empty rules file: $SESSION_DIR/rules.md"

echo "Session initialization complete."
echo "All scratchpads, rules, and artifacts for this task must live strictly within $SESSION_DIR."
