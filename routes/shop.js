const router = require('express').Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

module.exports = router;