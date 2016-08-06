"use strict";

var models = require('../models');
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var PollHistories = sequelize.define('poll_histories', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    poll_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.ENUM('normal','premium'),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: moment(),
      get: function() {
        return moment(this.getDataValue('created_at')).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    classMethods: {
      associate: function(models) {
        // Courses.belongsTo(models.events, {
        //   foreignKey: 'event_id'
        // });
        PollHistories.belongsTo(models.users, {
          foreignKey: 'user_id'
        });
        PollHistories.belongsTo(models.polls, {
          foreignKey: 'poll_id'
        });
      }
    }
  });

  return PollHistories;
};
