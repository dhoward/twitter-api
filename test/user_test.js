var jsdom = require('mocha-jsdom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var chai = require('chai');
var expect = chai.expect;
var User = require('../public/javascripts/components_build/user.js')

describe('UserComponent', function() {
  jsdom();
  var $;

  beforeEach(function() {
    $ = require('jquery');

    var user = {
      name: "Dan Howard",
      followers_count: 32,
      profile_image_url: "www.fakeurl.com"
    }

    this.component = TestUtils.renderIntoDocument(
      React.createElement(User, {user:  user })
    );
  });

  it("displays a user's name", function() {
    var name = TestUtils.findRenderedDOMComponentWithClass(this.component, 'name');
    expect( $(name.getDOMNode()).html() ).to.equal('Dan Howard');
  });

  it("displays a user's photo", function() {
    var img = TestUtils.findRenderedDOMComponentWithTag(this.component, 'img');
    expect( $(img.getDOMNode()).attr('src') ).to.equal('www.fakeurl.com');

  });

  it("displays a user's follower count", function() {
    var followers = TestUtils.findRenderedDOMComponentWithClass(this.component, 'followers');
    expect( $(followers.getDOMNode()).html() ).to.contain('32');
  });

});
