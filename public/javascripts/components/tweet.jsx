var Tweet = React.createClass({

  render: function() {
    var tweet = this.props.tweet;

    return (
      <div>

        <div>
          { tweet.created_at }
        </div>

        <div>
          { tweet.text }
        </div>

      </div>
    )
  }

});
