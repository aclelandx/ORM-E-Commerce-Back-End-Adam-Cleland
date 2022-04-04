// imports the model and the datatypes from the sequelize node module
const { Model, DataTypes } = require('sequelize');
// import the squelize connection from the config file.
const sequelize = require('../config/connection.js');
<<<<<<< HEAD

class Category extends Model { }
=======
// creates a new class that is an extenstion of the sequelize model.
class Category extends Model {}
>>>>>>> 2fe527f178363c2c7386a3ee1542d520ea21a486

// defines the specific information that will be saved inside of a category model.
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
// exports the category model so it can be utilized elsewhere in the application.
module.exports = Category;
