var Tweet = React.createClass({displayName: "Tweet",

  render: function() {
    var tweet = this.props.tweet;

    return (
      React.createElement("div", null, 

        React.createElement("div", null, 
           tweet.created_at
        ), 

        React.createElement("div", null, 
           tweet.text
        )

      )
    )
  }

});
