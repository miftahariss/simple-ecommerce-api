const transactionService = require('../services/transactionService');

const getAllTransactions = async (request, h) => {
    const { limit, offset } = request.query;
    try {
        const transactions = await transactionService.getAllTransactions(limit, offset);
        return h.response(transactions).code(200);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const getTransactionById = async (request, h) => {
    const { id } = request.params;
    try {
        const transaction = await transactionService.getTransactionById(id);
        if (!transaction) {
            return h.response('Transaction not found').code(404);
        }
        return h.response(transaction).code(200);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const createTransaction = async (request, h) => {
    try {
        const transaction = await transactionService.createTransaction(request.payload);
        return h.response(transaction).code(201);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const deleteTransaction = async (request, h) => {
    const { id } = request.params;
    try {
        const transaction = await transactionService.deleteTransaction(id);
        if (!transaction) {
            return h.response('Transaction not found').code(404);
        }
        return h.response('Transaction deleted').code(200);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    deleteTransaction
};
