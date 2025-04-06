const Order = require('../data_model/order');
const Item = require('../data_model/item');
const User = require('../data_model/user');

const calculateTotal = async (items, totalAmount) => {
    for (const entry of items) {
        const item = await Item.findById(entry.item);
        if (item) {
            totalAmount += item.price * entry.quantity;
        }
    }
    return totalAmount;
};

const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        let totalAmount = 0;
        if (items && items.length > 0) {
            totalAmount = await calculateTotal(items, totalAmount);
        }
        const user = await User.findById(req.userId);
        const newOrder = new Order({
            user: user._id,
            items,
            totalAmount,
        });
        await newOrder.save();
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating order',
            error: error.message,
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user items.item');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user items.item');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching order',
            error: error.message,
        });
    }
};

const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ user: userId })
            .populate('user items.item');
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching orders for user',
            error: error.message,
        });
    }
};

const getUserOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('user items.item');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching order',
            error: error.message,
        });
    }
};

const userCompleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        order.status = 'completed';
        await order.save();
        res.status(200).json({ message: 'Order completed successfully', order });
    } catch (error) {
        res.status(500).json({
            message: 'Error completing order',
            error: error.message,
        });
    }
};

const adminCompleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = 'completed';
        await order.save();
        res.status(200).json({ message: 'Order completed successfully', order });
    } catch (error) {
        res.status(500).json({
            message: 'Error completing order',
            error: error.message,
        });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, getOrdersByUserId, getUserOrderById, userCompleteOrder, adminCompleteOrder };