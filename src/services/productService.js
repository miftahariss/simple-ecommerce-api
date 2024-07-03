const productModel = require('../models/productModel');
const axios = require('axios');

const getAllProducts = async (limit, offset) => {
    return await productModel.getAllProducts(limit, offset);
};

const getProductBySKU = async (sku) => {
    return await productModel.getProductBySKU(sku);
};

const createProduct = async (product) => {
    const existingProduct = await productModel.getProductBySKU(product.sku);
    if (existingProduct) {
        throw new Error(`Product with SKU ${product.sku} already exists`);
    }
    return await productModel.createProduct(product);
};

const updateProduct = async (sku, product) => {
    return await productModel.updateProduct(sku, product);
};

const deleteProduct = async (sku) => {
    return await productModel.deleteProduct(sku);
};

const saveProductsFromAPI = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        const products = response.data.products.map(product => ({
            title: product.title,
            sku: product.sku,
            image: product.thumbnail,
            price: product.price,
            description: product.description,
        }));
        for (const product of products) {
            const existingProduct = await productModel.getProductBySKU(product.sku);
            if (!existingProduct) {
                await productModel.createProduct(product);
            }
        }
        return products;
    } catch (error) {
        throw new Error('Error fetching products from API');
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
