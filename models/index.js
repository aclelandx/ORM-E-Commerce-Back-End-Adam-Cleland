// import all the sequelize models from their file locations so they can be bundled together and exported for easy import.
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Categories have many Products that belong to it allowing for more than on product to be inside of a category.
Category.hasMany(Product, {
  foreignKey: `category_id`,
  onDelete: 'CASCADE',
})

// defines that the product model belongs to the category model, this is a one to one relatioship defining that one product can only belong to one category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// This defines that the product model belongs to many tags, this allow us to have multiple tags be the owner of specifed products, in a shop environment, this could be something like a color. additionally, the producttag model is being used as the through model.
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: `product_id`,
});

// this defines that the tag model belongs to many products. this allows us to have multiple products be associated with the product. Additionally the product tag is being used as the through model.
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: `tag_id`
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
