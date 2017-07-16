# gistbot

## Getting Started
Honestly I'm super sorry this is the longest getting started guide. Open to PR that can help make it shorter!

### Development Environment

#### Install Ngrok

1. Go to https://ngrok.com/download
2. Select the Download URL that matches your System
3. Unzip the File and put it somewhere you'll remember
4. (optional) create an alias for ngrok

```
# In ~/.bashrc
alias ngrok="~/Dropbox/ngrok http"
```

5. Now set your source to new bashrc `source ~/.bashrc`
6. Run ngrok 9001 ( you may need to create account / sign in )
7. Stop Ngrok for now

#### Setup Local Bot

1. In Bot directory copy sample env file `cp etc/.env.sample.js etc/.env.development.js`
2. Install node_modules `yarn install`
3. Run the App `yarn run start`
4. In a seperate tab run `ngrok 9001`
5. Leave your Bot Server and Ngrok Running

#### Configure Slack App

1. Make sure you are signed into your team and can view admin ex. `https://clintonslackbots.slack.com/admin`
2. Go to Slack Apps Admin https://api.slack.com/apps?new_app=1
3. Fill in App Name and Select your Slack Team
4. Click "Create App"
5. You should be on the "Basic Information Screen"
6. In the Left Rail Click "Features > Bot Users"
7. Click "Add Bot User" Fill in your bot name `gistbot`
8. If you don't plan on using an RTM connection flip "Always Show My Bot as Online" on.
9. Click Add Bot User
10. In the Left Rail Click "Features > Interactive Messages"
11. Click "Enable Interactive Messages"
12. Paste Your ngrok url in the `Request Url field` `https://3d5fc033.ngrok.io/slack`
13. Click Enable Interactive Messages
14. In the Left Rail Click "Features > Event Subscriptions"
15. Toggle Events on
16. Paste your webhook endpoint in the Request URL Field
17. Scroll Down to `Subscribe to Bot Events`
18. Add the Following Events
```
message.channels
message.groups
message.im
```
19. Click Save Change
20. In the Left Rail Click "Settings > Basic Information"
21. Copy Client Id, Client Secret and paste those in `etc/.env.development.js`
22. In the Left Rail Click "Features > Oauth & Permissions"
23. Under Redirect URL's add your ngrok oauth endpoint ex. `https://3d5fc033.ngrok.io/oauth`
24. Click "Save Urls"
25. Click "Install App To Team"
26. Copy the "Bot User OAuth Access Token" and paste in the token field of `etc/.env.development.js`
27. Restart Your Slack bot `CTRL C` and `yarn run start`
28. Finally Go To "Manage Distribution"
29. Click the "Add To Slack" button
30. Go through Oauth Process
31. You can now message your bot!
32. If you've made it this far you can go grab a beer or tea if that's your thing 😎

#### Resuming development
In order for your local environment to work you'll need to ensure that the Slack app has the correct ngrok URL. I just bookmark my slack app in chrome.

ex. https://api.slack.com/apps/xxx/event-subscriptions

1. Start Botkit Server `yarn run start`
2. New Tab `ngrok 9001`
3. Go to Slack Settings `Features > Interactive Messages`
4. Paste new Ngrok URL in `Request URL`
5. Go to `Features > Event Subscriptions`
6. Click Change in `Request URL`
7. Paste new Ngrok URL in `Request URL`