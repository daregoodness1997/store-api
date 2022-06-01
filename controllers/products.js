const Product = require('../models/Product');

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({}).sort('-name price');
  // throw new Error('testing async errors');
  res.status(200).json({ nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;

  const queryObject = {};
  queryObject;
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = {
      $regex: name,
      $options: 'i',
    };
  }

  // console.log(queryObject);
  // const products = await Product.find(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  const products = await result;
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
