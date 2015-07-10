var App = React.createClass({displayName: "App",

  getInitialState: function() {
    return {
      feed: new Feed()
    }
  },

  getFeed: function() {
    var _this = this;
    var username = React.findDOMNode(this.refs.username).value;
    var feed = new Feed({ username: username });

    feed.fetch().then( function(){
      _this.updateFeed(feed);
    });
  },

  updateFeed: function(feed) {
    this.setState({ feed: feed })
  },

  renderTweets: function() {
    var tweets = this.state.feed.get('tweets');

    if(!tweets) {
      return React.createElement("h2", null, "Use the search bar above to look for tweets!")
    }

    return tweets.map( function(tweet) {
      return React.createElement(Tweet, {key: tweet.id, tweet: tweet})
    });
  },

  checkEnter: function(event) {
    if(event.keyCode == 13){
      this.getFeed();
    }
  },

  render: function() {
    return (

      React.createElement("div", null, 
        React.createElement("div", null, 
          React.createElement("input", {ref: "username", onKeyDown: this.checkEnter}), 
          React.createElement("button", {onClick: this.getFeed}, "Get Feed")
        ), 

        React.createElement(User, {user:  this.state.feed.get('user') }), 
         this.renderTweets() 

      )
    )
  }

});
