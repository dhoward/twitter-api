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
    var tweets = this.state.feed.get('tweets') || [];
    var tweetItems =  tweets.map( function(tweet) {
      return React.createElement(Tweet, {key: tweet.id, tweet: tweet})
    });

    if(!tweets.length) {
      return null;
    } else {
      return (
        React.createElement("div", {className: "tweets"}, 
          React.createElement("div", {className: "tweet"}, 
            React.createElement("h3", {className: "tweet-headline"}, "Tweets")
          ), 
           tweetItems 
        )
      )
    }
  },

  checkEnter: function(event) {
    if(event.keyCode == 13){
      this.getFeed();
    }
  },

  render: function() {
    return (

      React.createElement("div", {className: "container"}, 

        React.createElement("div", {className: "row instructions"}, 
          React.createElement("div", {className: "col-xs-12"}, 
            React.createElement("p", null, "Welcome to the twitter api test! Use the search bar to look for tweets.")
          )
        ), 

        React.createElement("div", {className: "row form-inline search-form"}, 
          React.createElement("div", {className: "col-xs-12"}, 
            React.createElement("input", {className: "form-control", ref: "username", placeholder: "username", onKeyDown: this.checkEnter}), 
            React.createElement("button", {className: "btn btn-primary search-button", onClick: this.getFeed}, "Get Feed")
          )
        ), 

        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-12"}, 
            React.createElement(User, {user:  this.state.feed.get('user') })
          )
        ), 

        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-12"}, 
             this.renderTweets() 
          )
        )

      )
    )
  }

});
