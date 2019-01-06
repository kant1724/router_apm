var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '14.63.168.58',
  user     : 'chatbot',
  password : 'chatbot',
  database : 'router_apm'
});
connection.connect();

module.exports = {
  insertStatusHistory: function(today, hour, minute, seconds, facilityId, statusCd) {
    var sql = 'INSERT INTO STATUS_HISTORY VALUES (' + facilityId + ',' + statusCd + ',' + today + ',' + hour + ',' + minute + ',' + seconds + ')';
    connection.query(sql, function (error, results, fields) {
    });
  },
}
