const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model:Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {res.status(500).json(err)}
});

router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include:[{model:Product}]
    });
    !oneCategory ? res.status(404).json({message:`No Category found with that ID`})
    : res.status(200),json(oneCategory);
  } catch(err) {res.status(500).json(err)}
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.statusCode(200).json(newCategory);
  } catch (err) {res.status(500).json(err)}
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        category_id: req.params.id,
      },
    });
    !updatedCategory ? res.status(404).json({message:`No Category was found with that ID`})
    : res.status(200).json(updatedCategory)
  } catch (err) {res.status(500).json(err)}
});

router.delete('/:id', (req, res) => {
  try {
    const categoryToDelete = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    });
    !categoryToDelete ? res.status(404).json({message:`No Category was Found With that ID`})
    : res.status(200).json({message:`Category with the ID ${req.params.id} Have been deleted.`})
  } catch (err) {res.status(500).json(err)};
});

module.exports = router;
