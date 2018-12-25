var moment = require('moment');

var intervalName;
var MongoClient = require('mongodb').MongoClient;


var io = require('socket.io').listen(8011);  // 80 포트로 소켓을 엽니다
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

  soketStart: function(callback, seconds) {
	io.sockets.on('connection', function (socket) { // connection이 발생할 때 핸들러를 실행합니다.
		if ( gvIsConnect ) return;
		gvIsConnect = true;
		gvSocket = socket;
		console.log('server running at 8011 port');

	    MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("router_log");

			socket.on('inqIntervalSocket', function (data) { // 클라이언트에서 my other event가 발생하면 데이터를 받습니다.

				var g = moment().format();
				var today   = g.substring( 0, 10);
				var hour    = g.substring(11, 13);
				var minute  = g.substring(14, 16);
				var seconds = g.substring(17, 19);

				if ( gvSavTime == today + hour + minute + seconds + "" ) {
					// 1초에 2번이상 쿼리가 오면 무시하여 리턴.
					// console.log("하지마:"+gvSavTime);
					socket.emit('inqIntervalRtn', {res: ""} );

				} else {
					gvSavTime = today + hour + minute + seconds + "";
					//console.log("해:"+gvSavTime);

					dbo.collection("router_log").find({
						$and:[{"date" : today, "hour" : hour}] // , "minute" : minute
					}).sort({$natural : -1}).limit(1).toArray(function(err, result) {
					    if (err) throw err;
					    //console.log(result);
						socket.emit('inqIntervalRtn', {res: JSON.stringify(result)} );
					});
				}
			});

	    });

	    // On disconnect
	    socket.on('disconnect', function(){
	    	console.log("disconnect");
	    	gvIsConnect = false;
		    //if ( db != null ) db.close();
	    });

	    // 안씀. 예제임. ks20181225
		socket.on('my other event', function (data) { // 이런식으로 주고받고.
			console.log(data);
			socket.emit('news', { hello: 'world' }); // 클라이언트로 news 이벤트를 보냅니다. (hello 라는 키에 world라는 값이 담깁니다)
		});

	    // 안씀. 예제임. ks20181225
		socket.on('inqInterval', function (data) { // 클라이언트에서 my other event가 발생하면 데이터를 받습니다.
			console.log(data);
			module.exports.selectLogListAfterSeconds(
				function (ret) {
					console.log(ret);
					socket.emit('inqIntervalRtn', {res: JSON.stringify(ret)} );
				}
			);
		});

	});

  }
}
