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
    var tweets = this.state.feed.get('tweets');

    if(!tweets) {
      return <h2>Use the search bar above to look for tweets!</h2>
    }

    return tweets.map( function(tweet) {
      return <Tweet key={tweet.id} tweet={tweet} />
    });
  },

  checkEnter: function(event) {
    if(event.keyCode == 13){
      this.getFeed();
    }
  },

  render: function() {
    return (

      <div>
        <div>
          <input ref="username" onKeyDown={this.checkEnter}></input>
          <button onClick={this.getFeed}>Get Feed</button>
        </div>

        <User user={ this.state.feed.get('user') } />
        { this.renderTweets() }

      </div>
    )
  }

});
