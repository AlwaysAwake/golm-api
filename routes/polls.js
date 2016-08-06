var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.polls.find({
    include: [{
      model: models.poll_histories,
      include: [{
        model: models.users
      }]
    }]
  }).then(function (polls) {
    res.json({
      result: 1,
      polls: polls
    });
  }).catch(function(e) {
    console.log(e);

    res.json({
      result: 0
    });
  });
});

router.post('/', function(req, res, next) {
  var poll = models.polls.build({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    user_id: req.body.user_id,
    answer_A: req.body.answer_A,
    answer_B: req.body.answer_B,
    img_A: req.body.img_A,
    img_B: req.body.img_B,
    description_A: req.body.description_A,
    description_B: req.body.description_B
  });

  poll.save().then(function() {
    res.json({
      result: 1
    });
  }).catch(function(e) {
    console.log(e);

    res.json({
      result: 0
    });
  });
});

module.exports = router;
