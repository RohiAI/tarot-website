#!/bin/bash

# Navigate to the images directory
cd "$(dirname "$0")/images"

# List of expected image files
expected_files=(
  "logo.svg"
  "hero-bg.svg"
  "reader.svg"
  "cards.svg"
  "testimonial.svg"
  "contact.svg"
  "facebook.svg"
  "instagram.svg"
  "twitter.svg"
  "favicon.svg"
)

# Check each file
missing=0
for file in "${expected_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file is missing"
    missing=$((missing + 1))
  fi
done

# Summary
echo ""
if [ $missing -eq 0 ]; then
  echo "All image files are available! 🎉"
else
  echo "$missing image files are missing."
fi

# List all files in the directory for reference
echo ""
echo "Files in the images directory:"
ls -la 