"use strict";

var models = require('../models');
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var PremiumPolls = sequelize.define('premium_polls', {
    poll_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_applicant: {
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
        PremiumPolls.belongsTo(models.polls, {
          foreignKey: 'poll_id'
        });
      }
    }
  });

  return PremiumPolls;
};
