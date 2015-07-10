Feed = Backbone.Model.extend({

  defaults: {
    username: null,
    tweets: null,
    tweets_per_page: 25,
    has_more: false
  },

  url: function() {
    return '/tweets?username='+this.get('username')
  },

  getMore: function() {
    if(!this.get('tweets')) {
      return this.fetch();
    }

    var tweets = this.get('tweets');
    var last = tweets[tweets.length-1];
    var param = $.param({ max_id: last.id });
    return this.fetch({ data: param });
  },

  parse: function(data) {
    var tweets = this.get('tweets');

    data.has_more = data.tweets.length == this.get('tweets_per_page');

    if(tweets) {
      data.tweets = tweets.concat(data.tweets);
    }

    return data;
  }

});
