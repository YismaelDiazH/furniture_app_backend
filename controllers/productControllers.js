//productControllers.js
const Product = require('../models/Products')

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        console.log('Request Body:', req.body);
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log('Product created successfully:', newProduct);
        res.status(201).json(newProduct);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'failed to create the product' });
      
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 })
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json("failed to get the products")
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    }catch (error) {
        console.error("Error:", error);
        res.status(500).json("failed to get the product");
    }
  },

  searchProduct: async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $search: {
                    index: "furniture",
                    text: {
                        query: req.params.key,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            }
        ]);

        // Verificar si se encontraron resultados
        if (result.length === 0) {
            res.status(404).json({ message: "No products found matching the search criteria" });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error searching for products:", error);
        res.status(500).json({ error: "Failed to perform the product search" });
    }
}


};
