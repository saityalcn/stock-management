const router = require('express').Router();
const shopController = require('../controllers/shop');
const jsonParser = require('body-parser').json();


router.get('/orders', shopController.getOrders);
router.get('/beklenen-siparisler', shopController.getUndelieveredOrders);
router.get('/branches', shopController.getBranches);
router.get('/employees', shopController.getEmployees);
router.post('/add-employee', jsonParser,shopController.postAddEmployee);
router.post('/delete-employee',jsonParser, shopController.deleteEmployee);
router.post('/update-order-state', shopController.postUpdateOrderState);
router.get('/branches',shopController.getBranches );
router.get('/branches/:branchid',shopController.getBranch );
router.post('/employee/set-awl', jsonParser, shopController.setAwl);
router.get('/least-stock-products', shopController.getLeastStockProducts);
module.exports = router;
