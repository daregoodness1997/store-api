const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ nbHits: products.length, data: products });
};
const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({
    featured: true,
    name: 'vase table',
  });
  // throw new Error('testing async errors');
  res.status(200).json({ nbHits: products.length, data: products });
};

const getProduct = async (req, res) => {
  res.status(200).json({ msg: 'Gotten a product' });
};
const createProduct = async (req, res) => {
  res.status(200).json({ msg: 'Created a product' });
};
const deleteProduct = async (req, res) => {
  res.status(200).json({ msg: 'Deleted a product' });
};
const updateProduct = async (req, res) => {
  res.status(200).json({ msg: 'Updated a product' });
};

module.exports = {
  getAllProducts,
  getAllStaticProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
