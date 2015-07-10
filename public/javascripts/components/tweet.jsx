var Tweet = React.createClass({

  renderImages: function(tweet) {
    if(!tweet.entities.media) {
      return null;
    }

    return (
      <div className="image-holder">
        tweet.entities.media.map( function(media){
          return (
            <a href={ media[0].display_url }>
              <img src={ media[0].media_url } />
            </a>
          );
        })
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
          { tweet.text }
        </p>

        { this.renderImages(tweet) }

      </div>
    )
  }

});
