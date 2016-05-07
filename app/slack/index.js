var BotKit = require('botkit');
var path = require('path');
var fs = require('fs');
var os = require('os');

var token = process.env.REALTIME_SLACK_TOKEN;
var controller = BotKit.slackbot({debug: false, log: true});
var slack = controller.spawn({token: token});

function connect(){

	console.log('** Attempting to connect bot to slack...');
	slack.startRTM(function(err,bot,payload) {	//	Instantiate bot
		if (err) {
			console.log(err);
			throw new Error('** Could not connect to slack');
			setTimeout(connect(), 5000);
		} else {

			//	Read and initialize slack modules
			fs.readdirSync(__dirname).filter(function(file){
				return (file.indexOf('.') !== 0) && (file !== 'index.js');
			}).map(function(file){
				var handler = require(path.join(__dirname, file));
				controller[handler.name] = handler.events;
				controller[handler.name](controller, bot);
			});

			//	Payload includes user list, save them?
			if(payload.users){ /* Store users manually */ }

			bot.rooms = {};
			//	Payload includes channels, set into memory cache
			if(payload.channels){
				payload.channels.map(function(channel){
					bot.rooms[channel.name] = channel.id;
				});
			}
			//	Payload includes groups, set into memory cache
			//	GROUPS INCLDUES MULTI-PARTY IM'S
			if(payload.groups){
				payload.groups.map(function(group){
					bot.rooms[group.name] = group.id;
				});
			}
			//	Payload includes groups, set into memory cache
			if(payload.ims){
				payload.ims.map(function(im){
					bot.rooms[im.user] = im.id;
				});
			}

			//	Make the bot say hello when he joins
			bot.say({text: 'Online! <@' + bot.identity.id + '> running on ' + os.hostname()  + '!', channel: bot.rooms.slack_hack_night});

		}
	});

}

connect();

module.exports = slack;
