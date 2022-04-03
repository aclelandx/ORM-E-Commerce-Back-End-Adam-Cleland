// import all the sequelize models from their file locations so they can be bundled together and exported for easy import.
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: ``,
  onDelete:'CASCADE',
})

// defines that the product model belongs to the category model
Product.belongsTo(Category, {
  foreignKey:'category_id'
});


// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
