const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({
    include: [{model:ProductTag}, {model:Product}]
  })
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{model:ProductTag}, {model:Product}]
    });
    !oneTag ? res.status(404).json({message:`No Tag was found with that ID`})
    : res.status(200).json(oneTag)
  } catch (err) {res.status(500).json(err)}
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {res.status(500).json(err)}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        tag_id: req.params.id,
      },
    });
    !updateTag ? res.status(404).json({message:`No tag was found with this ID`})
    : res.status(200).json(updateTag)
  } catch (err) {res.status(500).json(err)}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });
    !deleteTag ? res.status(404).json({message:`No Tag was found with that ID`})
    :res.status(200).json({message:`Tag with the ID of ${req.params.id} has been deleted.`})
  } catch (err) {res.status(500).json(err)}
});

module.exports = router;
