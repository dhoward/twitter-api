var Tweet = React.createClass({displayName: "Tweet",

  render: function() {
    var tweet = this.props.tweet;

    return (
      React.createElement("div", {className: "tweet"}, 

        React.createElement("p", {className: "time"}, 
           formatDate(tweet.created_at) 
        ), 

        React.createElement("p", {className: "content"}, 
           tweet.text
        )

      )
    )
  }

});
