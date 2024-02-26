const mongoose = require('mongoose');

// Define Category schema
const categorySchema = new mongoose.Schema({
  name: String,
  // Add any other fields you need for the Category entity
});

// Define Product schema with a reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  // Add any other fields you need for the Product entity
});

// Create Category model
const Category = mongoose.model('Category', categorySchema);

// Create Product model with reference to Category
const Product = mongoose.model('Product', productSchema);

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Promise<Array>} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    // Use populate to get products with category details
    const productsWithCategory = await Product.find().populate('category').exec();
    return productsWithCategory;
  } catch (error) {
    console.error('Error fetching products with category details:', error);
    throw error;
  }
}

// Example usage
async function test() {
  // Connect to MongoDB (replace your connection string)
  await mongoose.connect('mongodb+srv://user01:<password>@<collection>?retryWrites=true&w=majority');

  // Create categories
  const category1 = await Category.create({ name: 'Electronics' });
  const category2 = await Category.create({ name: 'Clothing' });

  // Create products with associated categories
  await Product.create({ name: 'Laptop', price: 1000, category: category1._id });
  await Product.create({ name: 'T-shirt', price: 20, category: category2._id });

  // Call the function to retrieve products with populated category details
  const productsWithCategory = await getProductsPopulatedWithCategory();

  // Log the result
  console.log(productsWithCategory);

  // Disconnect from MongoDB
  await mongoose.disconnect();
}

// Run the test
test();
