React = require('react');
require('react/addons');
Feed = require('../models/feed')
User = require('./user')
Tweet = require('./tweet')

module.exports = React.createClass({displayName: "exports",

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      username: null,
      feed: new Feed(),
      loading: false
    }
  },

  // callback used when a @mention is clicked on
  getFeedForUser: function(username) {
    var _this = this;
    this.setState({ username: username }, function(){
      _this.getFeed();
    });
  },

  // get a new feed when a user is searched
  getFeed: function() {
    var _this = this;
    var username = this.state.username;
    var feed = new Feed({ username: username });

    this.setState({ loading: true });

    feed.fetch().then( function(){
      _this.updateFeed(feed);
    });
  },

  // get more tweets from the existing feed
  getNextPage: function() {
    var _this = this;
    var feed = this.state.feed;

    feed.getMore().then( function(){
      _this.updateFeed(feed);
    });
  },

  // update the UI when a feed is populated
  updateFeed: function(feed) {
    this.setState({ feed: feed, loading: false })
  },

  renderTweets: function() {
    var _this = this;
    var tweets = this.state.feed.get('tweets') || [];
    var tweetItems =  tweets.map( function(tweet) {
      return React.createElement(Tweet, {key: tweet.id, tweet: tweet, getFeedHandler: _this.getFeedForUser})
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

  // if the user pressed Enter on the search bar, reload feed
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
            React.createElement("input", {className: "form-control", valueLink: this.linkState('username'), placeholder: "username", onKeyDown: this.checkEnter}), 
             this.state.loading ?
                React.createElement("button", {className: "btn btn-primary search-button", disabled: true}, "Loading...")
              :
                React.createElement("button", {className: "btn btn-primary search-button", onClick: this.getFeed}, "Get Feed")
            
          )
        ), 

        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-12"}, 
             this.state.feed.get('error') ?
                React.createElement("h2", {className: "text-center"}, "Could not locate user")
              :
                React.createElement(User, {user:  this.state.feed.get('user') })
            
          )
        ), 

        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-12"}, 
             this.renderTweets() 
          )
        ), 

         this.state.feed.get('has_more') ?
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-xs-12 load-more"}, 
               this.state.loading ?
                  React.createElement("button", {className: "btn btn-primary", disabled: true}, "Loading...")
                :
                  React.createElement("button", {className: "btn btn-primary", onClick: this.getNextPage}, "Load More")
              
            )
          ) : null
        

      )
    )
  }

});
