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
      email: req.body.user.email,
      password: req.body.user.password
    }
  }).then(function(user) {
    if (user) {
      res.json({
        result: 1,
        user: user
      });
    } else {
      res.json({
        result: 0,
        err: 'Email or password is invalid.'
      });
    }
  });
});

router.post('/signup', function(req, res, next) {
  models.users.findOne({
    where : {
      email: req.body.user.email
    }
  }).then(function(user) {
    if (user) {
      res.json({
        result: 2,
        err: 'ID is duplicated.'
      });
    } else {
      var user = models.users.build({
        email: req.body.user.email,
        password: req.body.user.password,
        nickname: req.body.user.nickname,
        phone: req.body.user.phone
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
