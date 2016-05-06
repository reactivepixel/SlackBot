if(!process.env.REALTIME_SLACK_TOKEN){
	require('dotenv').config();							//	Set env vars for local testing
};
if (!process.env.REALTIME_SLACK_TOKEN) {
	console.log('Error: Specify token in environment');
};

var slack = require('./slack');							//	Initialize Slack controller

var http = require('http');
setInterval(function herokukeepalive(){  				//	Ping Heroku every 10 minutes (600000ms)
	console.log('** Keepalive ping');
	http.get(process.env.KEEPALIVE_ENDPOINT);
}, 600000);
