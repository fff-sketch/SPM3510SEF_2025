const Item = require('../data_model/item');

const item = async (req, res) => {
  try {
    const items = await Item.find({ available: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the items.' });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({ _id: id, available: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the item.' });
  }
};

const allitem = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the items.' });
  }
};

const getAllItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the item.' });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, description, price, category, available } = req.body;
    const newItem = new Item({
      name,
      description,
      price,
      category: category.toLowerCase(),
      available,
    });
    const savedItem = await newItem.save();
    res.status(201).json({ id: savedItem._id, item: savedItem });
  } catch (error) {
    res.status(400).json({ error: 'Error adding item.' });
  }
};

const editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, available } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category: category.toLowerCase(),
        available,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json({ id: updatedItem._id, item: updatedItem });
  } catch (error) {
    res.status(400).json({ error: 'Error editing item.' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting item.' });
  }
};

const disableItem = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedItem = await Item.findById(id);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    updatedItem.available = !updatedItem.available;
    updatedItem = await updatedItem.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: 'Error disabling item.' });
  }
};

module.exports = {
  item,
  getItemById,
  addItem,
  editItem,
  deleteItem,
  disableItem,
  allitem,
  getAllItemById
};