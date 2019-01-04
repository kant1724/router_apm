var cache = require('memory-cache');

module.exports = {
  getLog: function() {
    setInterval(function() {
      require('./log-list').selectLogListFromBackground(function(result) {
        cache.put('houdini', 'disappear', 1000, function(key, value) {
        });
        setTimeout(function() {
            console.log('Houdini is ' + cache.get('houdini'));
        }, 200);});
    }, 1000);
  }
}
