var express = require('express');
var router = express.Router();
var twitter = require('../util/twitter')
var default_username = 'BarackObama';

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter API' });
});

/* GET api calls */
router.get('/tweets', function(req, res, next) {
  var username = req.query.username;
  var count = req.query.count;
  var max_id = req.query.max_id;

  twitter.getTweets( username, count, max_id, function(error, tweets) {
    if(error) {
      res.send({ error: 'Could not find user', user: {}, tweets: [] });
      return;
    }

    var user = null;
    if(tweets.length) {
      user = tweets[0].user;
    }

    res.send({ user: user, tweets: tweets });
  });
});

module.exports = router;
