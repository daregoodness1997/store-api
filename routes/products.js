const router = require('express').Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/products');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;
