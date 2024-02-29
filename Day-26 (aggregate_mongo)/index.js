const mongoose = require('mongoose');

/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
async function getProductStatistics() {
    try {
        // Assuming you have a Mongoose Product model
        const Product = mongoose.model('Product');

        const pipeline = [
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    highestQuantity: { $max: '$quantity' },
                },
            },
        ];

        const result = await Product.aggregate(pipeline);

        // If there are no products, return default values
        if (result.length === 0) {
            return {
                totalProducts: 0,
                averagePrice: 0,
                highestQuantity: 0,
            };
        }

        return result[0]; // Return the first (and only) result
    } catch (error) {
        console.error('Error calculating product statistics:', error);
        throw error;
    }
}

// Example usage
// Make sure to establish a connection to your MongoDB before calling this function

// mongoose.connect('your_mongo_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });
// const productStatistics = await getProductStatistics();
// console.log(productStatistics);