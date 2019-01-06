module.exports = {
  insertStatusHistory: function(today, hour, minute, seconds, facilityId, statusCd) {
    var sql = 'INSERT INTO STATUS_HISTORY VALUES (' + facilityId + ',' + statusCd + ',' + today + ',' + hour + ',' + minute + ',' + seconds + ')';
    connection.query(sql, function (error, results, fields) {
    });
  },
}
