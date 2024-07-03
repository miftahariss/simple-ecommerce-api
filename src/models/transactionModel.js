const db = require('../utils/db');

const getAllTransactions = async (limit, offset) => {
    const res = await db.query('SELECT id, sku, qty, amount FROM transactions LIMIT $1 OFFSET $2', [limit, offset]);
    return res.rows;
};

const getTransactionById = async (id) => {
    const res = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
    return res.rows[0];
};

const createTransaction = async (transaction) => {
    const { sku, qty } = transaction;
    const productRes = await db.query('SELECT price, stock FROM products WHERE sku = $1', [sku]);
    if (productRes.rowCount === 0) {
        throw new Error('Product not found');
    }
    const product = productRes.rows[0];
    if (product.stock + qty < 0) {
        throw new Error('Stock cannot be less than 0');
    }
    const amount = product.price * qty;
    const res = await db.query(
        'INSERT INTO transactions (sku, qty, amount) VALUES ($1, $2, $3) RETURNING *',
        [sku, qty, amount]
    );
    await db.query('UPDATE products SET stock = stock + $1 WHERE sku = $2', [qty, sku]);
    return res.rows[0];
};

const deleteTransaction = async (id) => {
    const res = await db.query('DELETE FROM transactions WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    deleteTransaction
};
