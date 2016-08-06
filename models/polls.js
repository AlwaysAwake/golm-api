"use strict";

var models = require('../models');
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var Polls = sequelize.define('polls', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    answer_A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer_B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description_A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description_B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    img_A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    img_B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('normal','premium'),
      allowNull: false,
      defaultValue: 'normal'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        Polls.hasMany(models.poll_histories, {
          foreignKey: 'poll_id'
        });
        Polls.hasOne(models.premium_polls, {
          foreignKey: 'poll_id'
        });
      }
    }
  });

  return Polls;
};
