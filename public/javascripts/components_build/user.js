React = require('react');

module.exports = React.createClass({displayName: "exports",

  getDefaultProps: function() {
    return {
      user: null
    }
  },

  render: function() {
    var user = this.props.user;

    if(!user) {
      return null;
    }

    return (
      React.createElement("div", {className: "user"},
        React.createElement("img", {src:  user. profile_image_url}),
        React.createElement("span", {className: "name"},  user.name), " ", React.createElement("span", {className: "followers"},  user.followers_count, " Followers")
      )
    )
  }

});
