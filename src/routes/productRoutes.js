const productController = require('../controllers/productController');

module.exports = [
    { method: 'GET', path: '/products', handler: productController.getAllProducts },
    { method: 'GET', path: '/products/{sku}', handler: productController.getProductBySKU },
    { method: 'POST', path: '/products', handler: productController.createProduct },
    { method: 'PUT', path: '/products/{sku}', handler: productController.updateProduct },
    { method: 'DELETE', path: '/products/{sku}', handler: productController.deleteProduct },
    { method: 'GET', path: '/import-products', handler: productController.saveProductsFromAPI }
];
