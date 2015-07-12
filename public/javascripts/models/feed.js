var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    username: null,
    tweets: null,
    tweets_per_page: 25,
    has_more: false
  },

  url: function() {
    return '/tweets?username='+this.get('username')
  },

  // ths is a thin wrapper around fetch which adds a param to
  // get the next set of tweets
  getMore: function() {
    if(!this.get('tweets')) {
      return this.fetch();
    }

    var tweets = this.get('tweets');
    var last = tweets[tweets.length-1];
    var param = $.param({ max_id: last.id });
    return this.fetch({ data: param });
  },

  // add any new tweets to the current list
  // has_more is false if less than a full page is returned
  parse: function(data) {
    var tweets = this.get('tweets');

    data.has_more = data.tweets.length == this.get('tweets_per_page');

    if(tweets) {
      data.tweets = tweets.concat(data.tweets);
    }

    return data;
  }

});
