// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // defines the id for the product as an integer and cannot be null. This also auto increments, and is defined at the primary key for the model.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    // defines the name of the product as a string and it cannot be null.
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // defines the price of the item as a decimal and cannot be null.
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    // defines the stock of the item as an integer and it cannot be null.
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // make the category id reference the category model.
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: `category`,
        key: `id`,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
