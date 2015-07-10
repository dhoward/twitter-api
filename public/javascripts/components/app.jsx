var App = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      username: null,
      feed: new Feed(),
      loading: false
    }
  },

  getFeedForUser: function(username) {
    var _this = this;
    this.setState({ username: username }, function(){
      _this.getFeed();
    });
  },

  getFeed: function() {
    var _this = this;
    var username = this.state.username;
    var feed = new Feed({ username: username });

    this.setState({ loading: true });

    feed.fetch().then( function(){
      _this.updateFeed(feed);
    });
  },

  updateFeed: function(feed) {
    this.setState({ feed: feed, loading: false })
  },

  renderTweets: function() {
    var _this = this;
    var tweets = this.state.feed.get('tweets') || [];
    var tweetItems =  tweets.map( function(tweet) {
      return <Tweet key={tweet.id} tweet={tweet} getFeedHandler={_this.getFeedForUser} />
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
            <input className="form-control" valueLink={this.linkState('username')} placeholder="username" onKeyDown={this.checkEnter}></input>
            { this.state.loading ?
                <button className="btn btn-primary search-button" disabled>Loading...</button>
              :
                <button className="btn btn-primary search-button" onClick={this.getFeed}>Get Feed</button>
            }
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
