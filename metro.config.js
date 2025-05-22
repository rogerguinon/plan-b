const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// 👉 ESTA LÍNEA ES LA CLAVE
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
