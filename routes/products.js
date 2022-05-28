const router = require('express').Router();
const {
  getAllProducts,
  getAllStaticProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/products');

router.route('/').get(getAllProducts).post(createProduct);
router.get('/static', getAllStaticProducts);

router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;
