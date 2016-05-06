var users = {
	name: 'users',
	events: function(controller, bot){

		//	Utility to sort members by their slack role
		function getUserRole(users){
			//	Predeclare for push
			var user_list = {Admins: [], Users: [], Guests: [], Bots: []};
			users.map(function(o){
				switch(true){
					case (o.is_primary_owner == true):
					user_list.Admins.push(o);
					break;
					case (o.is_owner == true):
					user_list.Admins.push(o);
					break;
					case (o.is_bot == true):
					user_list.Bots.push(o);
					break;
					case (o.is_admin == true):
					user_list.Admins.push(o);
					break;
					case (o.is_restricted == true):
					user_list.Guests.push(o);
					break;
					case (o.is_ultra_restricted == true):
					user_list.Guests.push(o);
					break;
					default:
					user_list.Users.push(o);
					break;
				}
			});
			return user_list;
		}

		//	List present users
		controller.hears(['(find|get|list|show) users (active|awake|here|online|present)'],['direct_message','direct_mention','mention'],function(bot,message) {
			bot.reply(message, {"type": "typing"});	//	Show typing indicator while API fetches
			bot.api.users.list({token: bot.token, presence: 1},function(err,response) {
				if(err){	//	if API fails...
					return bot.reply(message, err);
				} else {
					//	Got users!
					var active_users = response.members.filter(function(user){
						return (user.presence == "active") && (user.presence != "undefined") && (user.is_bot !== true);
					});
					//	How many users?
					if (active_users.length > 1){
						var reply = "The following users are currently active:\n";		
						active_users = getUserRole(active_users);
						for (var key in active_users){
							if(active_users[key].length > 0){
								reply += key + ':\n'
								active_users[key].map(function(o){
									reply += "•\t" + o.name + " \n";
								});
							}
						}
					} else {
						//	Forever alone
						reply = "You are currently the only active user.\nhttp://i.imgur.com/i4Gyi2O.png";
					}
					return bot.reply(message, reply);
				}
			});
		});
	}
}

module.exports = users;