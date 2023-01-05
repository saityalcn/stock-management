const router = require('express').Router();
const shopController = require('../controllers/shop');
const jsonParser = require('body-parser').json();

router.get('/', shopController.getIndex);
router.get('/orders', shopController.getOrders);
router.get('/beklenen-siparisler', shopController.getUndelieveredOrders);
router.get('/branches', shopController.getBranches);
router.get('/product_info', shopController.getProductsInfo);
router.post('/update-order-state', shopController.postUpdateOrderState);
router.post('/add-order', shopController.addOrder);
router.get('/employees', shopController.getEmployees);
router.post('/delete-employee',jsonParser, shopController.deleteEmployee);
router.get('/branches/:branchid',shopController.getBranch );
router.get('/branch/products/:branchid',shopController.getProductsWithInfos);
router.get('/branch/employees/:branchid',shopController.getEmployeesFromBranch);

module.exports = router;
