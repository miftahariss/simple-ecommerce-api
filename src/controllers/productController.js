const productService = require('../services/productService');

const getAllProducts = async (request, h) => {
    const { limit, offset } = request.query;
    try {
        const products = await productService.getAllProducts(limit, offset);
        return h.response(products).code(200);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const getProductBySKU = async (request, h) => {
    const { sku } = request.params;
    try {
        const product = await productService.getProductBySKU(sku);
        if (!product) {
            return h.response('Product not found').code(404);
        }
        return h.response(product).code(200);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const createProduct = async (request, h) => {
    try {
        const product = await productService.createProduct(request.payload);
        return h.response(product).code(201);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const updateProduct = async (request, h) => {
    const { sku } = request.params;
    try {
        const product = await productService.updateProduct(sku, request.payload);
        if (!product) {
            return h.response('Product not found').code(404);
        }
        return h.response(product).code(200);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const deleteProduct = async (request, h) => {
    const { sku } = request.params;
    try {
        const product = await productService.deleteProduct(sku);
        if (!product) {
            return h.response('Product not found').code(404);
        }
        return h.response('Product deleted').code(200);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const saveProductsFromAPI = async (request, h) => {
    try {
        const products = await productService.saveProductsFromAPI();
        return h.response(products).code(201);
    } catch (error) {
        return h.response(error.message).code(500);
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
