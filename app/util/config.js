let env = process.env.NODE_ENV || 'development';

module.exports = require('./../../etc/.env' + (env ? '.' + env : '') + '.js');