React = require('react');

module.exports = React.createClass({

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
      <div className="user">
        <img src={ user. profile_image_url} />
        <span className="name">{ user.name }</span> <span className="followers">{ user.followers_count } Followers</span>
      </div>
    )
  }

});
