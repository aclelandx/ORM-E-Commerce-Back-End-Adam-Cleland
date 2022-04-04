const router = require('express').Router();
const { Category, Product } = require('../../models');

// Find all of the categories that are inside of the database.
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
    // catch any error that may occur on the server side of the appliction.
  } catch (err) { res.status(500).json(err) }
});

// find one specific category inside of the database via the ID
router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }]
    });
    // if the ID is not found let the user know
    !oneCategory ? res.status(404).json({ message: `No Category found with that ID` })
      : res.status(200).json(oneCategory);
  } catch (err) { res.status(500).json(err) }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) { res.status(500).json(err) }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    !updatedCategory ? res.status(404).json({ message: `No Category was found with that ID` })
      : res.status(200).json({ message: `Category has been updated, do another get request.` })
  } catch (err) { res.status(500).json(err) }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryToDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    !categoryToDelete ? res.status(404).json({ message: `No Category was Found With that ID` })
      : res.status(200).json({ message: `Category with the ID ${req.params.id} Has been deleted.` })
  } catch (err) { res.status(500).json(err) };
});

module.exports = router;
