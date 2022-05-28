const getAllProducts = (async = (req, res) => {
  res.status(200).json({ msg: 'Gotten all products' });
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
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
