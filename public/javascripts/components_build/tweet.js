var Tweet = React.createClass({displayName: "Tweet",

  renderImages: function(tweet) {
    if(!tweet.entities.media) {
      return null;
    }

    return (
      React.createElement("div", {className: "image-holder"}, 
         (tweet.entities.media) ?
          React.createElement("a", {href: tweet.entities.media[0].display_url}, 
            React.createElement("img", {src: tweet.entities.media[0].media_url})
          ) : null
        
      )
    )
  },

  render: function() {
    var tweet = this.props.tweet;

    return (
      React.createElement("div", {className: "tweet"}, 

        React.createElement("p", {className: "time"}, 
           formatDate(tweet.created_at) 
        ), 

        React.createElement("p", {className: "content"}, 
           tweet.text
        ), 

         this.renderImages(tweet) 

      )
    )
  }

});
