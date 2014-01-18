/*

This node script handles uploading a screenshot of your computer to S3 every 5 seconds.
It should be run on the computer your presentation is being viewed on.

*/

var exec = require('child_process').exec;
var fs = require('fs');
var http = require('http');
var express = require('express');
var Firebase = require('firebase');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();

var app = express();

app.configure('development', function() {
	app.use(express.bodyParser());
	app.use(express.errorHandler());
	app.use(express.compress());
	
	app.locals.pretty = true;
	
	app.set("view engine", 'hbs');
	app.set("view options", { layout: false });
	
	app.use(express.static(__dirname));
});

var firebase_root_url = 'https://controller.firebaseio.com';
var firebase_root = new Firebase(firebase_root_url);

app.all('/', function(req, res) {
	res.sendfile(__dirname + '/presentation.html');
});

app.all('/screenshot', function(req, res) {
	res.sendfile(__dirname + '/screenshot.jpg');
});

app.all('/mirror', function(req, res) {
	res.sendfile(__dirname + '/mirror.html');
});

app.all('/client', function(req, res) {
	res.sendfile(__dirname + '/client.html');
});

http.createServer(app).listen(80);

firebase_root.child('screencast/current_slide').on('value', function(snapshot) {
	setTimeout(takeAScreenshot, 500);
	setTimeout(takeAScreenshot, 1000);
	setTimeout(takeAScreenshot, 1500);
});

firebase_root.child('screencast/force_reload').on('value', function(snapshot) {
	var val = snapshot.val();
	if(val) {
		snapshot.ref().remove();
		takeAScreenshot();
	}
});

var takeAScreenshot = function() {
	exec('screencapture screenshotBig.png -T 0; sips -Z 320 --setProperty format jpeg --setProperty formatOptions low screenshotBig.png --out screenshot.jpg;', function() {
		fs.stat('screenshot.jpg', function(err, file_info) {
			if(err) console.log('fs.stat error', err);
			var bodyStream = fs.createReadStream('screenshot.jpg');
			s3.putObject({
				Bucket: 'mhacksscreencast',
				Key: 'screenshot.jpg',
				ContentLength: file_info.size,
				Body: bodyStream,
				ACL: 'public-read',
				ContentType: 'image/jpg'
			}, function(err, data) {
				if(err) console.log('s3.putObject error', err);
				firebase_root.child('screencast/last_updated').set(Firebase.ServerValue.TIMESTAMP);
			});
		});
	});
}
