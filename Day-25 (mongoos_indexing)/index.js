const mongoose = require('mongoose');

/**
 * Creates an index on the "name" field of the "Product" collection in MongoDB
 */
function createProductNameIndex() {
    // Assuming you have a Mongoose Product model
    const Product = mongoose.model('Product');

    // Creating an index on the "name" field
    Product.createIndex({ name: 1 }, (err) => {
        if (err) {
            console.error('Error creating index:', err);
        } else {
            console.log('Index on "name" field created successfully');
        }
    });
}