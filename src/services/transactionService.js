const transactionModel = require('../models/transactionModel');

const getAllTransactions = async (limit, offset) => {
    return await transactionModel.getAllTransactions(limit, offset);
};

const getTransactionById = async (id) => {
    return await transactionModel.getTransactionById(id);
};

const createTransaction = async (transaction) => {
    return await transactionModel.createTransaction(transaction);
};

const deleteTransaction = async (id) => {
    return await transactionModel.deleteTransaction(id);
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    deleteTransaction
};
