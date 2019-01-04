var memjs = require('memjs');
var mc = memjs.Client.create('14.63.168.58:11211', {
  username: 'aa',
  password: 'aa'
});

module.exports = {
  getLog: function() {
    setInterval(function() {
      require('./log-list').selectLogListFromBackground(function(result) {
        mc.set('foo', 'bar', 10);
        mc.get('foo', function (err, value, key) {
          console.log(value);
        });
        console.log(result);
      });
    }, 1000);
  }
}
