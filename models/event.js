'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },{underscored: true,
    timestamps: true,
    hooks: {}});

  Event.associate = function(models){
    this.hasMany(models.Step, {foreignKey: 'event_id'})
  };
  return Event;
};