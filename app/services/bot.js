/**
 * Create Slack RTM connection and export it
 */
 
let config = require('./../util/config');
let Botkit = require('botkit');
let passport = require('passport');
let session = require('express-session');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let GitHubStrategy = require('passport-github2').Strategy;
let partials = require('express-partials');

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

    /**
     * More Advanced Github Gist Example see comment in `server.js`
     */
    
    if( config.githubDemoEnabled ) {


      webserver.use(passport.initialize());
      webserver.use(passport.session());

      passport.serializeUser((user, done) => {
        done(null, user);
      });

      passport.deserializeUser((obj, done) => {
        done(null, obj);
      });

      passport.use(new GitHubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL,
        customHeaders: {"User-Agent" : "Gist Slackbot"}
      },
      (accessToken, refreshToken, profile, cb) => {
        
        let user = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        };

        return cb(err, user);
      }));

      webserver.get('/auth/github',
        passport.authenticate('github', { scope: [ 'user:email' ] }),
        (req, res) => {
          // The request will be redirected to GitHub for authentication, so this
          // function will not be called.
        });

      webserver.get('/auth/github/callback', 
        passport.authenticate('github', { failureRedirect: '/login' }),
        (req, res) => {
          res.status(200).json({ 'access_token' : req.user.accessToken });
        });


    }

});

module.exports = controller;