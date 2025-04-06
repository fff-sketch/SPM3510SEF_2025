const authRoutes = require('./authRoutes');
const acctRoutes = require('./acctRoutes');
const imageRoutes = require('./imageRoutes');
const itemRoutes = require('./itemRoutes');
const orderRoutes = require('./orderRoutes');

const initRoutes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/acct', acctRoutes);
    app.use('/api/image', imageRoutes);
    app.use('/api/item', itemRoutes);
    app.use('/api/order', orderRoutes);
};

module.exports = initRoutes;