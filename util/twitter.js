var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'nuLC3RgddQsTuPFBXr2z5k3NZ',
  consumer_secret: 'VnXI5BEBWXmPe5iWRyW1RnDAIbDZGSf5wI1RcA5XRlFZ82ANTq',
  access_token_key: '3273389202-jlsTOVqXfcHC9gVjDQU3c5hgxwVArSt6WCAkk55',
  access_token_secret: 'tITeu150bT7fu9yTRdHoURfKT1gB6Of3oc0SDwha1QYvm'
});

module.exports = {

  getTweets: function(username, count, max_id, callback){
    if(count == null) {
      count = 25;
    };

    var params = { screen_name: username, count: count, max_id: max_id };

    client.get('statuses/user_timeline', params, callback);
  }

};
