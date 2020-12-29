const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/user.controller');
const validation = require('../../validations/user.validation');
const authenticated = require('../../middlewares/authenticated');

const router = express.Router();

// un protected route
// Notice the same names of functions/object in validation and controller
router.route('/greet-me').get(validate.validate(validation.me), controller.me);

// protected route
router.route('/greet-me-protected').get(authenticated, validate.validate(validation.me), controller.me);

// Testing mssql connection
router.route('/test_mssql').get(validate.validate(validation.test_mssql), controller.test_mssql);

router.route('/encrypt').post(validate.validate(validation.encrypt), controller.encrypt);
router.route('/decrypt').post(validate.validate(validation.decrypt), controller.decrypt);

module.exports = router;
