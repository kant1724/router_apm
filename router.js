var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('views/templates/main.html');
	});

	app.get('/log-list', function(req, res) {
		res.render('views/templates/log-list.html');
	});

	app.get('/animation', function(req, res) {
		res.render('views/templates/animation.html');
	});

	app.get('/status-history', function(req, res) {
		res.render('views/templates/status-history.html');
	});

	app.get('/terminal', function(req, res) {
		res.render('views/templates/terminal.html');
	});

	app.post('/socketStart', function(req, res) {
		var ret = require('./server/log-list').socketStart(
			function callback(ret) {
				res.status(200).send({res: JSON.stringify(ret)});
			});
	});

	app.post('/selectLogList', urlencodedParser, function(req, res) {
		var ret = require('./server/log-list').connect(
			function callback(ret) {
				res.status(200).send({res: JSON.stringify(ret)});
			}
		);
	});

	app.post('/selectLogListAfterSeconds', urlencodedParser, function(req, res) {
		var ret = require('./server/log-list').selectLogListAfterSeconds(
			function callback(ret) {
				res.status(200).send({res: JSON.stringify(ret)});
			}
		, seconds = req.body.seconds);
	});
}
