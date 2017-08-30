'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    sender_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    step_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },{underscored: true,
    timestamps: true,
    hooks: {}});

  User.associate = function(models){
    this.belongsTo(models.Step, {foreignKey: 'step_id'})
  };
  return User;
};