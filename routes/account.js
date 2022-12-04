const router = require('express').Router();
const accountController = require('../controllers/account');
const jsonParser = require('body-parser').json();

router.post('/log-in', jsonParser, accountController.postLogin);
router.post('/current-user', jsonParser, accountController.getCurrentUser);

module.exports = router;