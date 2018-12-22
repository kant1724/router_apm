var moment = require('moment');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://14.63.168.58:27017/";
module.exports = {
  connect: function(callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("router_log");
      dbo.collection("router_log").find({}).toArray(function(err, result) {
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
      console.log(minute);
      dbo.collection("router_log").find({
        $and:[{"date" : today, "hour" : hour, "minute" : minute}]
      }).sort({$natural : -1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        callback(result);
      });
    });
  }
}
