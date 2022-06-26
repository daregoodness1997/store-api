const Product = require('../models/Product');

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  // throw new Error('testing async errors');
  res.status(200).json({ nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

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

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      match => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];

    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  // const products = await Product.find(queryObject);
  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nbHits: products.length, data: products });
};

const getProduct = async (req, res) => {
  const {
    params: { id: productId },
  } = req;
  const product = await Product.find({ _id: productId });
  res.status(200).json({ product });
};
const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};
const deleteProduct = async (req, res) => {
  const {
    params: { id: productId },
  } = req;

  const product = await Product.findByIdAndDelete({ _id: productId });
  res.status(200).json({ msg: `Deleted a product of id ${productId}` });
};
const updateProduct = async (req, res) => {
  const {
    body: { name, price, featured, rating, company },
    params: { id: productId },
  } = req;

  if (
    name === '' ||
    price === '' ||
    featured === '' ||
    rating === '' ||
    company === ''
  ) {
    console.log('Fields should not be empty');
  }
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(200)
    .json({ product, msg: `Updated a product of id ${productId}` });
};

module.exports = {
  getAllProducts,
  getAllStaticProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
