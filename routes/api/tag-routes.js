// imports npm packages required for the functionality of the application.
const router = require('express').Router();
// imports our models that we will be using in the routes from our models folder
const { Tag, Product, ProductTag } = require('../../models');

// finds all the tags that are in the database.
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err)
  }


});
// find a specific tag via ID, id is specifed in the Request URL in the :id field.
router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findOne({
      where: { id: req.params.id },
      // populate additional information.
      include: [{ model: Product, through: ProductTag }]
    });
    // if the tag cannot be found let the user know
    !oneTag ? res.status(404).json({ message: `No Tag was found with that ID` }) : res.status(200).json(oneTag);
    // catch any errors that may occur on the server end of the application.
  } catch (err) { res.status(500).json(err) }
});
// add a new tag to the database
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
    // catch any errors that may occur on the server end of the application.
  } catch (error) { res.status(500).json(err) }
});
// update an existing tag in the database with information provided in the req.body
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if the tag cannot be found let the user know.
    !updateTag ? res.status(404).json({ message: `No tag was found with this ID` })
      : res.status(200).json(updateTag)
    // catch any errors that may occur on the server end of the application.
  } catch (err) { res.status(500).json(err) }
});

// Deletes a tag from the database, user specifies where in the request URL in the id section.
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if the tag cannot be found let the user know
    !deleteTag ? res.status(404).json({ message: `No Tag was found with that ID` })
      : res.status(200).json({ message: `Tag with the ID of ${req.params.id} has been deleted.` })
    // catch any errors that may occur on the server end of the application.
  } catch (err) { res.status(500).json(err) }
});

// exports this route to be imported elsewhere.
module.exports = router;
