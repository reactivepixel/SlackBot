var request = require('request');

var meetup_api_key = process.env.MEETUP_API_KEY;

var config = [
'Design-with-a-Purpose',
'familab',
'OrlandoDevs',
'Orlando-Tech',
'Code-For-Orlando'
];

var meetup = {
	name: 'meetup',
	events: function(controller, bot){

		//	Show from a specific meetup by name
		controller.hears(['(find|get|list|show) meetup (.*)'], ['direct_message','direct_mention','mention'], function(bot,message) {

			bot.reply(message, {"type": "typing"});	//	Show typing indicator while API fetches

			var query = 'https://api.meetup.com/' + message.match[2] + '/events?&sign=true&page=5';

			//	Call meetup API to find 
			request(query, function (error, response, body) {
				if (!error && response.statusCode == 200) {

					var events = JSON.parse(body);
					var event_fields = [];

					for (var event in events) {
						event_fields.push({
							"title": events[event].name || "",
							"value": events[event].link || "",
							"short": false
						});
						if(events[event].venue){
							event_fields.push({
								"title": "Address:",
								"value": events[event].venue.address_1 || "",
								"short": true
							});
						}
						event_fields.push({
							"title": "Time:",
							"value": new Date(events[event].time) || "",
							"short": true
						});
					}
					var meetups = [{
						"fallback": "Meetups from " + message.match[2],
						"color": "#AC2624",
						"title": "Meetups from " + message.match[2],
						"fields": event_fields,
					}];

					var post = {
						channel: message.channel,
						username: 'Meetup',
						icon_emoji: ':meetup:',
						attachments: JSON.stringify(meetups),
						text: ' '
					};

					bot.api.chat.postMessage(post, function(err, response) {
						if(err){ return console.log(err); };
					});

				}
			});
		});
	}
}

module.exports = meetup;