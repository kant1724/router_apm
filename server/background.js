var cache = require('memory-cache');

module.exports = {
  getLog: function() {
    setInterval(function() {
      require('./log-list').selectLogListFromBackground(function(result) {
        var hour = result[0].hour;
        var minute = result[0].minute;
        var log = result[0].log;
        var ip = result[0].ip;
        cache.put(hour + minute, result, 1000, function(key, value) {});
        setTimeout(function() {
        }, 1000);
      });
    }, 600000);
  },

  getLogByKey: function(hour, minute) {
    return cache.get(hour + minute);
  }
}
