var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {


  res.json({
    result: 1
  });
});

router.post('/', function(req, res, next) {
  models.poll_histories.findOne({
    where : {
      user_id: req.body.user_id,
      poll_id: req.body.poll_id,
    }
  }).then(function(pollHistory) {
    console.log(pollHistory);

    if (pollHistory) {
      res.json({
        result: 0,
        err: 'Already polled user.'
      });
    } else {
      var pollHistory = models.poll_histories.build({
        user_id: req.body.user_id,
        poll_id: req.body.poll_id,
        answer: req.body.answer,
        comment: req.body.comment,
      });

      pollHistory.save().then(function() {
        res.json({
          result: 1
        });
      }).catch(function(err) {
        res.json({
          result: 0,
          err: err
        });
      });
    }
  });
});

module.exports = router;
