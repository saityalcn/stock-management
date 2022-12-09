const router = require('express').Router();
const shopController = require('../controllers/shop');
const jsonParser = require('body-parser').json();


router.get('/orders', shopController.getOrders);
router.get('/employees', shopController.getEmployees);
router.post('/delete-employee',jsonParser, shopController.deleteEmployee);
router.post('/update-order-state', shopController.postUpdateOrderState);
router.get('/branches',shopController.getBranches );
router.get('/branches/:branchid',shopController.getBranch );

module.exports = router;