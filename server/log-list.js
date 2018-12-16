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
        callback();
      });
    });
  }
}
