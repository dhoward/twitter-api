var App = React.createClass({

  getInitialState: function() {
    return {
      feed: new Feed()
    }
  },

  getFeed: function() {
    var _this = this;
    var username = React.findDOMNode(this.refs.username).value;
    var feed = new Feed({ username: username });

    feed.fetch().then( function(){
      _this.updateFeed(feed);
    });
  },

  updateFeed: function(feed) {
    this.setState({ feed: feed })
  },

  renderTweets: function() {
    var tweets = this.state.feed.get('tweets') || [];
    var tweetItems =  tweets.map( function(tweet) {
      return <Tweet key={tweet.id} tweet={tweet} />
    });

    if(!tweets.length) {
      return null;
    } else {
      return (
        <div className="tweets">
          <div className="tweet">
            <h3 className="tweet-headline">Tweets</h3>
          </div>
          { tweetItems }
        </div>
      )
    }
  },

  checkEnter: function(event) {
    if(event.keyCode == 13){
      this.getFeed();
    }
  },

  render: function() {
    return (

      <div className="container">

        <div className="row instructions">
          <div className="col-xs-12">
            <p>Welcome to the twitter api test! Use the search bar to look for tweets.</p>
          </div>
        </div>

        <div className="row form-inline search-form">
          <div className="col-xs-12">
            <input className="form-control" ref="username" placeholder="username" onKeyDown={this.checkEnter}></input>
            <button className="btn btn-primary search-button" onClick={this.getFeed}>Get Feed</button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <User user={ this.state.feed.get('user') } />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            { this.renderTweets() }
          </div>
        </div>

      </div>
    )
  }

});
