var User = React.createClass({displayName: "User",

  render: function() {
    var user = this.props.user;

    if(!user) {
      return null;
    }

    return (
      React.createElement("div", {className: "user"}, 
        React.createElement("span", null,  user.name), " ", React.createElement("span", null,  user.followers_count, " Followers")
      )
    )
  }

});
