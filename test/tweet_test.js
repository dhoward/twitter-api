var jsdom = require('mocha-jsdom');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var chai = require('chai');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.should();
chai.use(sinonChai);
var Tweet = require('../public/javascripts/components_build/tweet.js')

describe('TweetComponent', function() {
  jsdom();
  var tweet;
  var $;

  beforeEach(function() {
    $ = require('jquery');

    var date = 1436554229610;
    this.mentionHandler = sinon.stub();

    tweet = {
      created_at: date,
      text: "hey @someguy",
      entities: {
        media: [{
          display_url: "displayurl",
          media_url: "mediaUrl"
        }]
      }
    };

    this.component = TestUtils.renderIntoDocument(
      React.createElement(Tweet, {tweet:  tweet, getFeedHandler: this.mentionHandler })
    );
  });

  it("displays the date and time a tweet was created", function() {
    var time = TestUtils.findRenderedDOMComponentWithClass(this.component, 'time');
    expect( $(time.getDOMNode()).html() ).to.equal('July 10, 2015 @ 11:50am');
  });

  it("displays the text content of the tweet", function() {
    var text = TestUtils.findRenderedDOMComponentWithClass(this.component, 'content');
    expect( $(text.getDOMNode()).html() ).to.contain('hey');
    expect( $(text.getDOMNode()).html() ).to.contain('@someguy');
  });

  it("displays any media", function() {
    var media = TestUtils.findRenderedDOMComponentWithClass(this.component, 'media');
    var image = $(media.getDOMNode()).find('img');
    expect( $(media.getDOMNode()).attr('href') ).to.equal('mediaUrl');
    expect( $(image).attr('src') ).to.equal('mediaUrl');
  });

  it("creates links out of any @mentions", function() {
    var link = TestUtils.findRenderedDOMComponentWithClass(this.component, 'mention');
    expect( $(link.getDOMNode()).html() ).to.equal('@someguy');
  });

  describe("a @mention link", function(){
    beforeEach(function(){
      var link = TestUtils.findRenderedDOMComponentWithClass(this.component, 'mention');
      React.addons.TestUtils.Simulate.click(link);
    });

    it("gets a new user's feed when a mention is clicked", function() {
      this.mentionHandler.should.have.been.calledOnce
      this.mentionHandler.should.have.been.calledWith('someguy')
    });
  });

});
