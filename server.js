let config = require('./app/util/config');
let BotService = require('./app/services/bot');

/**
 * Setup all of your "skills" and pass the bot service too them
 */

let boot = () => {
  console.log('booted!');
}

/**
 * Here we can start the APP or export the app and config for testing
 */

if (require.main === module) {

  boot();

} else {

  module.exports.boot = boot;
  module.exports.config = config;

}