const express = require('express');
const verifyRole = require('../middleware/verify');
const whitelist = require('../middleware/whitelist');
const { item, getItemById, addItem, editItem, deleteItem, disableItem, allitem, getAllItemById } = require('../controllers/itemController');

const router = express.Router();

router.get('/item', item);

router.get('/item/:id', getItemById);

router.get('/allitem', whitelist, verifyRole('admin'), allitem);

router.get('/allitem/:id', whitelist, verifyRole('admin'), getAllItemById);

router.post('/additem', whitelist, verifyRole('admin'), addItem);

router.put('/edititem/:id', whitelist, verifyRole('admin'), editItem);

router.delete('/deleteitem/:id', whitelist, verifyRole('admin'), deleteItem);

router.patch('/disableitem/:id', whitelist, verifyRole('admin'), disableItem);

module.exports = router;