const router = require('express').Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/orders', shopController.getOrders);
router.post('/update-order-state', shopController.postUpdateOrderState);
router.get('/branches',shopController.getBranches );
router.get('/branches/:branchid',shopController.getBranch );

module.exports = router;