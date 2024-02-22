const mongoose = require('mongoose');

// Step 1: Define Mongoose schema for the "Product" entity
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Step 2: Create Mongoose model using the schema
const Product = mongoose.model('Product', productSchema);

// Step 3: Implement CRUD operations

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 * @returns {Promise} - Promise resolving to the created product
 */
async function createProduct(product) {
    try {
        const newProduct = new Product(product);
        return await newProduct.save();
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves all products from MongoDB
 * @returns {Promise} - Promise resolving to an array of product objects
 */
async function getAllProducts() {
    try {
        return await Product.find();
    } catch (error) {
        throw error;
    }
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 * @returns {Promise} - Promise resolving to the updated product
 */
async function updateProduct(productId, updatedProduct) {
    try {
        return await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 * @returns {Promise} - Promise resolving to the deleted product
 */
async function deleteProduct(productId) {
    try {
        return await Product.findByIdAndDelete(productId);
    } catch (error) {
        throw error;
    }
}

// Example usage:
(async () => {
    try {
        // Create a product
        const createdProduct = await createProduct({
            name: 'Sample Product',
            price: 19.99,
            quantity: 100,
        });
        console.log('Created Product:', createdProduct);

        // Retrieve all products
        const allProducts = await getAllProducts();
        console.log('All Products:', allProducts);

        // Update a product
        const updatedProduct = await updateProduct(createdProduct._id, {
            price: 24.99,
        });
        console.log('Updated Product:', updatedProduct);

        // Delete a product
        const deletedProduct = await deleteProduct(createdProduct._id);
        console.log('Deleted Product:', deletedProduct);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        // Close the MongoDB connection when done
        mongoose.disconnect();
    }
})();
