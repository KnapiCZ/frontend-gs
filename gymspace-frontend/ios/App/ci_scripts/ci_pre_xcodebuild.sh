#!/bin/sh
echo "Installing CocoaPods dependencies..."
gem install cocoapods --no-document
pod install
echo "CocoaPods dependencies installed."

