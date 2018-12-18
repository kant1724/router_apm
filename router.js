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

	app.post('/selectLogList', urlencodedParser, function(req, res) {
		var ret = require('./server/log-list').connect(
			function callback(ret) {
				res.status(200).send({res: JSON.stringify(ret)});
			}
		);
	});
}
