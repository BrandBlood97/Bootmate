const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Class extends Model {}

Class.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Class',
  }
);

module.exports = Class;
