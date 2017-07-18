/**
 * Create Slack RTM connection and export it
 */
 
let config = require('./../util/config');
let Botkit = require('botkit');

let controller = Botkit.slackbot({
  stats_optout: true,
  interactive_replies: true,
  require_delivery: true,
  debug: false,
  retry: true,
  require_delivery: true,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  scopes: [
    'bot',
    'incoming-webhook',
    'team:read',
    'users:read',
    'users.profile:read',
    'channels:read',
    'im:read',
    'im:write',
    'groups:read',
    'emoji:read',
    'chat:write:bot',
    'links:read',
    'chat.unfurl'
  ],
  json_file_store: './tmp/'
});

controller.startTicking();

controller.setupWebserver(config.port, (err, webserver) => {

    controller.createHomepageEndpoint(controller.webserver);

    controller.createOauthEndpoints(controller.webserver, (err, req, res) => {

        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }

    });

    controller.createWebhookEndpoints(controller.webserver);

    webserver.post('/slack', (req, res) => {

      res.status(200);
      controller.handleWebhookPayload(req, res);

    });

});

module.exports = controller;