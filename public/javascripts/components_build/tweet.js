React = require('react');
Util = require('../util/util');

module.exports = React.createClass({displayName: "exports",

  getDefaultProps: function() {
    return {
      tweet: null,
      getFeedHandler: null
    }
  },

  getFeed: function(username) {
    this.props.getFeedHandler(username);
  },

  parseContent: function(content) {
    var _this = this;
    var words = content.split(' ');

    return words.map( function(word, i) {
      if(word.charAt(0) == '@') {
        return React.createElement("a", {className: "mention", key: i, href: "#", onClick: _this.getFeed.bind(_this, _this.extractName(word))}, word);
      } else {
        return React.createElement("span", {key: i},  word );
      }
    });
  },

  extractName: function(word) {
    if(word.charAt(0) === '@') {
      word = word.substr(1);
    }

    var lastLetter = word.charAt(word.length-1);
    if(lastLetter === ':' || lastLetter === ".") {
      word = word.substring(0, word.length - 1);
    }

    return word;
  },

  renderImages: function(tweet) {
    if(!tweet.entities.media) {
      return null;
    }

    var mediaItems = tweet.entities.media.map( function(media){
      return (
        React.createElement("a", {className: "media", key:  media.media_url, href:  media.media_url}, 
          React.createElement("img", {src:  media.media_url})
        )
      );
    })

    return (
      React.createElement("div", {className: "image-holder"}, 
         mediaItems 
      )
    )
  },

  render: function() {
    var tweet = this.props.tweet;

    return (
      React.createElement("div", {className: "tweet"}, 

        React.createElement("p", {className: "time"}, 
           Util.formatDate(tweet.created_at) 
        ), 

        React.createElement("p", {className: "content"}, 
           this.parseContent(tweet.text) 
        ), 

         this.renderImages(tweet) 

      )
    )
  }

});
