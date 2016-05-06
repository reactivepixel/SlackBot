var personality = {
	name: 'personality',
	events: function(controller, bot){
		
		var pug_time = true;

		controller.on('reaction_added', function(bot, message){
			if(message.reaction == "pug" && pug_time == true){
				bot.reply(message, {"type": "typing"});
				var post = {
					channel: message.item.channel,
					username: ' ',
					icon_emoji: ':pug:',
					text: "_*Pugs pugs pugs!*_"
				};
				bot.say(post);
				pug_time = false;
			}
			setTimeout(function(){ return pug_time = true; }, 300000);
		});

	}
}

module.exports = personality;
