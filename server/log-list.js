var moment = require('moment');
var background = require('./background');

var intervalName;
var MongoClient = require('mongodb').MongoClient;


var io = require('socket.io').listen(8011);
var gvSocket;
var gvSavTime;
var gvIsConnect = false;

var url = "mongodb://14.63.168.58:27017/";
module.exports = {
  connect: function(callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("router_log");
      dbo.collection("router_log").find({}).limit(10).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        callback(result);
      });
    });
  },

  selectLogListAfterSeconds: function(callback, seconds) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("router_log");
      var g = moment().format();
      var today = g.substring(0, 10);
      var hour = g.substring(11, 13);
      var minute = g.substring(14, 16);
      console.log(g + " " + today + " " + hour + " " + minute);
      dbo.collection("router_log").find({
        $and:[{"date" : today, "hour" : hour, "minute" : minute}]
      }).sort({$natural : -1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        callback(result);
      });
    });
  },

  selectLogListFromBackground: function(callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("router_log");
      var g = moment().format();
      var today = g.substring(0, 10);
      var hour = g.substring(11, 13);
      var minute = g.substring(14, 16);
      dbo.collection("router_log").find({
        $and:[{"date" : today, "hour" : hour, "minute" : minute}]
      }).sort({$natural : -1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        callback(result);
      });
    });
  },

  soketStart: function(callback, seconds) {
    io.sockets.on('connection', function (socket) {
  		if (gvIsConnect) {
        return;
      }
  		gvIsConnect = true;
  		gvSocket = socket;
  		console.log('server running at 8011 port');
  	  socket.on('dataFromClient', function (data) {
				var g = moment().format();
				var today   = g.substring( 0, 10);
				var hour    = g.substring(11, 13);
				var minute  = g.substring(14, 16);
				var seconds = g.substring(17, 19);
        console.log(today);
        var res = background.getLogByKey();
        socket.emit('dataFromServer', {res: JSON.stringify(res)});
      });
      socket.on('disconnect', function() {
      	console.log("disconnect");
      	gvIsConnect = false;
      });
    });
  }
}
