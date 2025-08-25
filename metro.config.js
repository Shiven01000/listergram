const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper asset resolution
config.resolver.assetExts.push('svg');

module.exports = config;