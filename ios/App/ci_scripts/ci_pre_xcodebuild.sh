#!/bin/bash
set -e  # Exit on any error

echo "Starting pre-Xcode build script for CocoaPods..."

# Navigate to the correct directory containing the Podfile
IOS_APP_DIR=$(cd "$(dirname "$0")/.." && pwd)
echo "CocoaPods working directory: $IOS_APP_DIR"
cd "$IOS_APP_DIR"

# Step 1: Ensure Ruby environment is set up
echo "Checking Ruby environment..."
if ! command -v gem &> /dev/null; then
  echo "RubyGems not found! Please ensure Ruby is installed."
  exit 1
fi

# Step 2: Install CocoaPods if not already installed
if ! command -v pod &> /dev/null; then
  echo "CocoaPods not found. Installing..."
  gem install cocoapods --no-document
else
  echo "CocoaPods is already installed."
fi

# Step 3: Run pod install
if [ -f "Podfile" ]; then
  echo "Running pod install..."
  pod install
  echo "CocoaPods dependencies installed successfully."
else
  echo "No Podfile found in $IOS_APP_DIR. Please ensure the Podfile exists."
  exit 1
fi

echo "Pre-Xcode build script for CocoaPods completed successfully."
