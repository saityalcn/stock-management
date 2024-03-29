const router = require('express').Router();
const shopController = require('../controllers/shop');
const jsonParser = require('body-parser').json();

router.get('/orders', shopController.getOrders);
router.get('/beklenen-siparisler', shopController.getUndelieveredOrders);
router.get('/branches', shopController.getBranches);
router.get('/product_info', shopController.getProductsInfo);
router.post('/update-order-state', shopController.postUpdateOrderState);
router.post('/add-order', shopController.addOrder);
router.get('/employees', shopController.getEmployees);
router.post('/add-employee', jsonParser,shopController.postAddEmployee);
router.post('/delete-employee',jsonParser, shopController.deleteEmployee);
router.get('/branches/:branchid',shopController.getBranch );
router.post('/employee/set-awl', jsonParser, shopController.setAwl);
router.get('/least-stock-products', shopController.getLeastStockProducts);
router.get('/branch/products/:branchid',shopController.getProductsWithInfos);
router.get('/branch/employees/:branchid',shopController.getEmployeesFromBranch);
router.get('/sales', shopController.getSales);
router.get('/discounts', shopController.getDiscounts);
router.post('/add-discount', jsonParser, shopController.postAddDiscount);
router.post('/cancel-discount', jsonParser, shopController.postCancelDiscount);
router.post('/add-sale', jsonParser, shopController.postAddSale);

module.exports = router;
