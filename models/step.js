'use strict';
module.exports = function(sequelize, DataTypes) {
  var Step = sequelize.define('Step', {
    func_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{underscored: true,
    timestamps: true,
    hooks: {}});
  Step.associate = function(models){
    this.belongsTo(models.Event, {foreignKey: 'event_id'});
    this.hasMany(models.User, {foreignKey: 'step_id'});
  };
  return Step;
};