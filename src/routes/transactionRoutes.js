const transactionController = require('../controllers/transactionController');

module.exports = [
    { method: 'GET', path: '/transactions', handler: transactionController.getAllTransactions },
    { method: 'GET', path: '/transactions/{id}', handler: transactionController.getTransactionById },
    { method: 'POST', path: '/transactions', handler: transactionController.createTransaction },
    { method: 'DELETE', path: '/transactions/{id}', handler: transactionController.deleteTransaction }
];
