const pool = require('../utils/db');

const getAllProducts = async (limit, offset) => {
    const query = 'SELECT title, sku, image, price, (SELECT SUM(qty) FROM transactions WHERE sku = products.sku) as stock FROM products LIMIT $1 OFFSET $2';
    const values = [limit, offset];
    const result = await pool.query(query, values);
    return result.rows;
};

const getProductBySKU = async (sku) => {
    const query = 'SELECT * FROM products WHERE sku = $1';
    const values = [sku];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const createProduct = async (product) => {
    const query = 'INSERT INTO products (title, sku, image, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [product.title, product.sku, product.image, product.price, product.description];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateProduct = async (sku, product) => {
    const query = 'UPDATE products SET title = $1, image = $2, price = $3, description = $4 WHERE sku = $5 RETURNING *';
    const values = [product.title, product.image, product.price, product.description, sku];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteProduct = async (sku) => {
    const deleteTransactionsQuery = 'DELETE FROM transactions WHERE sku = $1';
    await pool.query(deleteTransactionsQuery, [sku]);

    const query = 'DELETE FROM products WHERE sku = $1 RETURNING *';
    const values = [sku];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const saveProductsFromAPI = async (products) => {
    for (const product of products) {
        const existingProduct = await getProductBySKU(product.sku);
        if (!existingProduct) {
            await createProduct(product);
        }
    }
};

module.exports = {
    getAllProducts,
    getProductBySKU,
    createProduct,
    updateProduct,
    deleteProduct,
    saveProductsFromAPI
};
