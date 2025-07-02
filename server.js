// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// route implementation for POST /api/products
app.post('/api/products', async (req, res) => {
  try {
      const products = new Product(req.body);
      await products.save();
      res.status(201).send(products);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Route implementation for GET /api/products
app.get('/api/products', async (req, res)=> {
  try{
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Route implementation for GET /api/products/:id
app.get('/api/products', async (req, res)=> {
  try{
    const products = await Product.findById(req.params.id);
    if (!products) return res.status(404).send({ message: 'Product not found' });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Route implementation for PUT /api/products/:id
app.put('/api/products', async (req, res) => {
  try {
    const task = await Product.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true, runValidators: true });
    if (!products) return res.status(404).send({ message: 'Product not found' });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route implementation for DELETE /api/products/:id
app.delete('/api/products', async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    if (!products) return res.status(404).send({ message: 'Task not found' });
    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 