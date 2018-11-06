/**
 * Handle correct configuration depending on environment.
 */
const path = require('path');

const env = process.env.NODE_ENV || 'production';

//Global config
let config = {
  env: env
};

//Load config depending on environnment
const envConfig = require(path.join(__dirname, 'environments', env));
config = Object.assign(config, envConfig);

module.exports = config;
