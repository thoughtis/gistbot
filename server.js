let config = require('./app/util/config');
let BotService = require('./app/services/bot');

/**
 * Setup all of your "skills" and pass the bot service too them
 */

let boot = () => {
  require('./app/skills/smallTalk').skill(BotService);
  
  /**
   * If you want to see a more advanced example update your .env file to 
   * enable the github gist demo, there are extra steps in the README to do so
   */
  
  if( config.githubDemoEnabled ) {
  	require('./app/skills/new').skill(BotService);
  }

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