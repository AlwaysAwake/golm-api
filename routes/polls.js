var express = require('express');
var router = express.Router();
var moment = require('moment');

var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.polls.findAll({
    include: [{
      model: models.poll_histories,
      include: [{
        model: models.users
      }]
    }, {
      model: models.premium_polls
    }],
    where: {
      expired_at: {
        $gt: new Date(moment())
      }
    }
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
    description_B: req.body.description_B,
    expired_at: req.body.expired_at
  });

  poll.save().then(function(poll) {
    if (req.body.type === 'premium') {
      console.log(poll);

      var premium_poll = models.premium_polls.build({
        poll_id: poll.id,
        price: req.body.price,
        total_applicant: req.body.applicant,
      });

      premium_poll.save().then(function(premiumPoll) {
        res.json({
          result: 1
        });
      });
    } else {
      res.json({
        result: 1
      });
    }
  }).catch(function(e) {
    console.log(e);

    res.json({
      result: 0
    });
  });
});

router.get('/:id', function(req, res, next) {
  models.polls.findOne({
    include: [{
      model: models.poll_histories,
      include: [{
        model: models.users
      }]
    }, {
      model: models.premium_polls
    }],
    where: {
      id: req.params.id
    }
  }).then(function (poll) {
    models.poll_histories.count({ where: { poll_id: req.params.id, answer: 'A' }}).then(function(cntA) {
      models.poll_histories.count({ where: { poll_id: req.params.id, answer: 'B' }}).then(function(cntB) {
        poll.dataValues['count_A'] = cntA;
        poll.dataValues['count_B'] = cntB;

        res.json({
          result: 1,
          poll: poll
        });
      });
    });
  }).catch(function(e) {
    console.log(e);

    res.json({
      result: 0
    });
  });
});

router.post('/:id/able', function(req, res, next) {
  models.poll_histories.findOne({
    where: {
      poll_id: req.params.id,
      user_id: req.body.userId
    }
  }).then(function (pollHistory) {
    res.json({
      result: 1,
      pollHistory: pollHistory
    });
  }).catch(function(e) {
    console.log(e);

    res.json({
      result: 0
    });
  });
});

module.exports = router;
