const defaultConfig = require('./defaultConfig.json');

const envType = process.env.NODE_ENV || 'development';

module.exports = defaultConfig[envType];
