const router = require('express').Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/orders', shopController.getOrders);
router.get('/beklenen-siparisler', shopController.getUndelieveredOrders);
router.get('/branches', shopController.getBranches);
router.post('/update-order-state', shopController.postUpdateOrderState);

module.exports = router;
