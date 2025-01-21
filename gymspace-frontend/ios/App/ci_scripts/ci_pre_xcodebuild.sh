#!/bin/bash
set -e  # Exit on any error

echo "Starting pre-Xcode build script..."

# Navigate to the root of the repository
REPO_ROOT=$(cd "$(dirname "$0")/../../.." && pwd)
echo "Repository root: $REPO_ROOT"
cd "$REPO_ROOT"

# Step 1: Install Node.js dependencies
if [ -f "package.json" ]; then
  echo "Installing Node.js dependencies..."
  npm install
else
  echo "No package.json found. Skipping Node.js dependency installation."
fi

# Step 2: Ensure Ruby environment is set up
echo "Setting up Ruby environment..."
if ! command -v gem &> /dev/null; then
  echo "RubyGems not found! Please ensure Ruby is installed."
  exit 1
fi

# Install CocoaPods (if not already installed)
if ! command -v pod &> /dev/null; then
  echo "CocoaPods not found. Installing..."
  gem install cocoapods --no-document
else
  echo "CocoaPods is already installed."
fi

# Step 3: Run pod install for the iOS project
IOS_APP_DIR="$REPO_ROOT/gymspace-frontend/ios/App"
if [ -f "$IOS_APP_DIR/Podfile" ]; then
  echo "Running pod install in $IOS_APP_DIR..."
  cd "$IOS_APP_DIR"
  pod install
else
  echo "No Podfile found in $IOS_APP_DIR. Skipping pod install."
fi

echo "Pre-Xcode build script completed successfully."
