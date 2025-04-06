const express = require('express');
const whitelist = require('../middleware/whitelist');
const { createOrder, getAllOrders, getOrderById, getOrdersByUserId, getOrderByUserId, userCompleteOrder, adminCompleteOrder } = require('../controllers/orderController');
const verifyRole = require('../middleware/verify');

const router = express.Router();

router.post('/create', verifyRole('user'), createOrder);

router.get('/', whitelist, verifyRole('admin'), getAllOrders);

router.get('/:id', whitelist, verifyRole('admin'), getOrderById);

router.get('/user', verifyRole('user'), getOrdersByUserId);

router.get('/user/:id', verifyRole('user'), getOrderByUserId);

router.post('/complete/user/:id', verifyRole('user'), userCompleteOrder);

router.post('/complete/admin/:id', whitelist, verifyRole('admin'), adminCompleteOrder);

module.exports = router;