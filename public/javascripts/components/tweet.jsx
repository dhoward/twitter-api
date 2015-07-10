var Tweet = React.createClass({

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

      </div>
    )
  }

});
