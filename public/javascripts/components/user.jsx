var User = React.createClass({

  render: function() {
    var user = this.props.user;

    if(!user) {
      return null;
    }

    return (
      <div className="user">
        <span>{ user.name }</span> <span>{ user.followers_count } Followers</span>
      </div>
    )
  }

});
