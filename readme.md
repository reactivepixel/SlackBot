# Slack Hack Night

## Installation
Requirements
* Brew ( [Video: How to Install](https://youtu.be/lI_2DWnYo8o) )
* NodeJS ( [Video: How to Install](https://youtu.be/sD4IQjyv9f8) )


#### MongoDB Installation

With _Brew_ already installed you can run the following commands to install MongoDB, setup your database folder, and assign the correct permissions to it.

> Note: MongoDB Installation is required but you can skip if you already have it installed.

```
brew install mongodb
sudo mkdir /data/db
sudo chown -R $(whoami): /data
```

#### Get the Code

Fork this repo onto your own github account.

>In the top-right corner of this page, click Fork

Clone your forked repo to your laptop.
> This will download the files into your current folder in terminal. Make certain to navigate to a folder where you want this project to live.

```
git clone your_forked_repo_url
```

Install the dependencies. Navigate to your code via terminal and command:

```
npm install
```

Additional Global Installs to make your life easier.

```
npm i -g nodemon mocha
```
#### Get the Bot's Token

Obtain @spambot's Bot Token from the #slack_hack_night channel on [wdd.slack.com](https://wdd.slack.com).

Create an ```.env``` file on the root of your project with the token.

```
echo "BOT_TOKEN=paste_your_bot_token_here" > .env
```

Start your MongoDB server in a separate terminal window.
```
mongod
```

Start the bot.

```
nodemon src/server.js
```

## Interacting / Testing the Bot

A majority of your testing should occur through Direct Messages with @spambot. If your feature needs to be tested in a room please use the room #slack_hack_night. Note that multiple devs will be using the same bots, therefor you may get some of their testing data or output. As a matter of courtesy try to set your bot to trigger only on commands related to your feature.

## Development

Modify the ```src/server.js``` file to suit your needs.

### How to Release

Developers will be testing on @spambot. As your feature is completed and ready to promote to staging make a pull request to this repo, once merged in it will automatically deploy to @phishbot. At the end of the Hack Night we will revise the final code and push to production and your scripts will live on in infamy under @hal.

| Bot | Environment|
|---|---|
| @hal | Production |
| @phishbot | Staging |
| @spambot | Development |



### Resources

* [Botkit](https://howdy.ai/botkit/)
* [WDD Slack](https://wdd.slack.com)
* [Slack Real Time Messaging API (RTM)](https://api.slack.com/rtm)
