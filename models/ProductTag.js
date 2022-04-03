const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    product_tag_id : {
      type:DataTypes.INTEGER,
      allowNull:true,
      primaryKey:true,
      autoIncrement:true
    },
    product_id : {
      type:DataTypes.INTEGER,
      references: {
        model:`product`,
        key:`product_id`,
      }
    },
    tag_id : {
      type:DataTypes.INTEGER,
      // references the TAG models ID
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
