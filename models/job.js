'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    budget: DataTypes.STRING,
    level: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Job.hasMany(models.User, { foreignKey: 'userId'} )
      }
    }
  });
  return Job;
};