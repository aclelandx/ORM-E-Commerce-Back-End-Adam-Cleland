const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // defines the tag id as the primary key for the tag model, this cannot be null, is an integer, and will autoincrement depending on how many exist in the database.
    tag_id :{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:true
    },
    // defines the tag name as a string.
    tag_name: {
      type:DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
