var moment = require('moment');
var background = require('./background');

var io = require('socket.io').listen(8011);
var gvSocket;
var gvSavTime;
var gvIsConnect = false;

module.exports = {
  socketStart: function(callback, seconds) {
    io.sockets.on('connection', function (socket) {
  		if (gvIsConnect) {
        return;
      }
  		gvIsConnect = true;
  		gvSocket = socket;
  		console.log('server running at 8011 port');
  	  socket.on('dataFromClient', function (data) {
				var g = moment().format();
				var today   = g.substring(0, 10);
				var hour    = g.substring(11, 13);
				var minute  = g.substring(14, 16);
				var seconds = g.substring(17, 19);
        var res = background.getLogByKey(hour, minute);
        socket.emit('dataFromServer', {res: JSON.stringify(res)});
      });
      socket.on('disconnect', function() {
      	console.log("disconnect");
      	gvIsConnect = false;
      });
    });
  }
}
