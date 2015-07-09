var express = require('express');
var router = express.Router();
var twitter = require('../util/twitter')
var default_username = 'BarackObama';

/* GET home page */
router.get('/', function(req, res, next) {
  twitter.getTweets( default_username, function(tweets) {
    var user = tweets[0].user;
    res.render('index', { title: 'Twitter API', user: user, tweets: tweets });
  });
});

/* GET api calls */
router.get('/tweets', function(req, res, next) {
  var username = req.query.username;

  twitter.getTweets( username, function(tweets) {
    var user = tweets[0].user;
    res.send({ user: user, tweets: tweets });
  });
});

module.exports = router;
