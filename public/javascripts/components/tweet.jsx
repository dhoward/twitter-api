var Tweet = React.createClass({

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

    return words.map( function(word) {
      if(word.charAt(0) == '@') {
        return <a href="#" onClick={_this.getFeed.bind(_this, _this.extractName(word))}>{word}</a>;
      } else {
        return word;
      }
    });
  },

  extractName: function(word) {
    if(word.charAt(0) === '@') {
      word = word.substr(1);
    }

    if(word.charAt(word.length-1) === ':') {
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
        <a href={ media.display_url }>
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
          { formatDate(tweet.created_at) }
        </p>

        <p className="content">
          { this.parseContent(tweet.text) }
        </p>

        { this.renderImages(tweet) }

      </div>
    )
  }

});
