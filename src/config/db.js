var mongoose = require("mongoose");

// Connection strigh is set to MONGODB_URI if availible or default to localhost
var uristring = process.env.MONGODB_URI || 'mongodb://localhost/slackbot';

mongoose.connect(uristring, function(err, res) {
	if (err) {
		console.log(uristring + ' - ' + err, "MongoDB Connection", false);
	} else {
		console.log(uristring, "MongoDB Connection", true);
	}
});
