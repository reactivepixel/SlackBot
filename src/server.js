if (!process.env.BOT_TOKEN) dotenv = require('dotenv').load();

if (!process.env.BOT_TOKEN) {
	console.log('Error: Specify token in environment');
	process.exit(1);
}

var Botkit = require('botkit');
var os = require('os');

var botCtrl = Botkit.slackbot({
	debug: true,
});

var bot = botCtrl.spawn({
	token: process.env.BOT_TOKEN
}).startRTM();

// Controllers, write your own!
var archive = require('./controllers/archive.js')(botCtrl);
