// improts require npm packages for the functionality of the routes
const router = require('express').Router();
// impors the models we will be utilizing from our models folder
const { Product, Category, Tag, ProductTag } = require('../../models');

// find all products in the database.
router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(allProducts)
    // catch any error that may occur from the servers side of the application
  } catch (err) { res.status(500).json(err) }
});

// find one specif product from the database via the ID of the product
router.get('/:id', async (req, res) => {
  try {
    const oneProduct = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    // if the product was not found let the user know.
    !oneProduct ? res.status(404).json({ message: `No Product was found with that ID.` })
      : res.status(200).json(oneProduct);
    // handle any errors that have have occured from the server side of the application.
  } catch (err) { res.status(500).json(err) }
});

// create new product // This is part of the starter code from the Boot Camp
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if the product was not found let the user know.
    !deletedProduct ? res.status(404).json({ message: `No Product was found with that ID` })
      : res.json({ message: `Product with the ID ${req.params.id} has been deleted` })
    // catch any errors that may have occured on the server side of the application.
  } catch (err) { res.status(500).json(err) }
});

module.exports = router;
