const { Router } = require('express');
const router = Router();

const { getMyproducts, insertProducts } = require('../controllers/cart-controller');

router.route('/')
    .get(getMyproducts);

router.route('/:id')
    .put(insertProducts);

module.exports = router;