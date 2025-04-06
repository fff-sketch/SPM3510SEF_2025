const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: function() { return this.items.length > 0; },
      },
      quantity: {
        type: Number,
        required: function() { return this.items.length > 0; },
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryAddress: {
    type: String,
  },
});

const Order = mongoose.model('Order', orderSchema);

orderSchema.pre('validate', function(next) {
  const hasItems = this.items && this.items.length > 0;
  const hasDrinks = this.drinks && this.drinks.length > 0;
  if (!hasItems && !hasDrinks) {
    return next(new Error('Order must contain at least one menu item or one drink.'));
  }
  next();
});

module.exports = Order;