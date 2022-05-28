const getAllProducts = (async = (req, res) => {
  res.status(200).json({ msg: 'Gotten all products' });
});
const getAllStaticProducts = (async = (req, res) => {
  throw new Error('testing async errors');
});

const getProduct = (async = (req, res) => {
  res.status(200).json({ msg: 'Gotten a product' });
});
const createProduct = (async = (req, res) => {
  res.status(200).json({ msg: 'Created a product' });
});
const deleteProduct = (async = (req, res) => {
  res.status(200).json({ msg: 'Deleted a product' });
});
const updateProduct = (async = (req, res) => {
  res.status(200).json({ msg: 'Updated a product' });
});

module.exports = {
  getAllProducts,
  getAllStaticProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
