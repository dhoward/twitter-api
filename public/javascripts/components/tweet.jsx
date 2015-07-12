React = require('react');
Util = require('../util/util');

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      tweet: null,
      getFeedHandler: null
    }
  },

  // call the given callback when a @mention is clicked
  getFeed: function(username) {
    this.props.getFeedHandler(username);
  },

  // create links out of @mentions in tweet
  parseContent: function(content) {
    var _this = this;
    var words = content.split(' ');

    return words.map( function(word, i) {
      if(word.charAt(0) == '@') {
        return <a className="mention" key={i} href="#" onClick={_this.getFeed.bind(_this, _this.extractName(word))}>{word}</a>;
      } else {
        return <span key={i}>{ word }</span>;
      }
    });
  },

  // remove any punctuation from @mentions for correct linking
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

  // render any media in tweet
  renderImages: function(tweet) {
    if(!tweet.entities.media) {
      return null;
    }

    var mediaItems = tweet.entities.media.map( function(media){
      return (
        <a className="media" key={ media.media_url } href={ media.media_url }>
          <img src={ media.media_url } />
        </a>
      );
    })

    return (
      <div className="image-holder">
        { mediaItems }
      </div>
    )
  },

  render: function() {
    var tweet = this.props.tweet;

    return (
      <div className="tweet">

        <p className="time">
          { Util.formatDate(tweet.created_at) }
        </p>

        <p className="content">
          { this.parseContent(tweet.text) }
        </p>

        { this.renderImages(tweet) }

      </div>
    )
  }

});
