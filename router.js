var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('views/templates/main.html');
	});

	app.get('/table', function(req, res) {
		res.render('views/templates/table.html');
	});

	app.post('/select', urlencodedParser, function(req, res) {
		var ret = require('/server/main').select(
			function callback(board_num) {
				res.status(200).send({res: JSON.stringify(ret)});
			}
		);
	});
}
