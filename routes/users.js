var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', function(req, res, next) {
  models.users.findOne({
    where : {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function(user) {
    res.json({
      result: 1,
      user: user
    });
  });
});

router.post('/signup', function(req, res, next) {
  models.users.findOne({
    where : {
      email: req.body.email
    }
  }).then(function(user) {
    if (user) {
      res.json({
        result: 2,
        err: 'ID is duplicated.'
      });
    } else {
      var user = models.users.build({
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
        phone: req.body.phone
      });

      user.save().then(function(user) {
        console.log(user);

        res.json({
          result: 1,
          user: user
        });
      }).catch(function(e) {
        console.log(e);

        res.json({
          result: 0
        });
      });
    }
  });
});

module.exports = router;
