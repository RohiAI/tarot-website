#!/bin/bash

# Script to create placeholder images for the Mystic Tarot website
# This script requires ImageMagick to be installed
# Install with: brew install imagemagick (on macOS) or apt-get install imagemagick (on Ubuntu)

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first."
    echo "On macOS: brew install imagemagick"
    echo "On Ubuntu: apt-get install imagemagick"
    exit 1
fi

# Create images directory if it doesn't exist
mkdir -p images

# Create logo
convert -size 200x100 gradient:#7b2cbf:#5a189a \
    -gravity center -pointsize 30 -fill white -font "Arial-Bold" -annotate 0 "MYSTIC\nTAROT" \
    images/logo.png

# Create hero background
convert -size 1920x1080 gradient:#2d2d2d:#7b2cbf \
    -gravity center -pointsize 50 -fill white -font "Arial-Bold" -annotate 0 "HERO BACKGROUND" \
    images/hero-bg.jpg

# Create reader image
convert -size 600x800 gradient:#5a189a:#9d4edd \
    -gravity center -pointsize 40 -fill white -font "Arial-Bold" -annotate 0 "TAROT\nREADER" \
    images/reader.jpg

# Create tarot card back
convert -size 400x700 gradient:#2d2d2d:#5a189a \
    -fill none -stroke gold -strokewidth 10 -draw "rectangle 20,20 380,680" \
    -gravity center -pointsize 30 -fill gold -font "Arial-Bold" -annotate 0 "TAROT\nCARD\nBACK" \
    images/tarot-back.jpg

# Create favicon
convert -size 32x32 gradient:#7b2cbf:#5a189a \
    -gravity center -pointsize 16 -fill white -font "Arial-Bold" -annotate 0 "MT" \
    images/favicon.ico

# Create social sharing image
convert -size 1200x630 gradient:#5a189a:#9d4edd \
    -gravity center -pointsize 60 -fill white -font "Arial-Bold" -annotate 0 "MYSTIC TAROT\nREADINGS" \
    images/tarot-share.jpg

echo "Placeholder images created successfully in the images directory."
echo "Replace these with your actual images before deploying the website." 