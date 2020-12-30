const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/deliverscanner.controller');
const validation = require('../../validations/deliverscanner.validation');
const authenticated = require('../../middlewares/authenticated');

const router = express.Router();

router.route('/checkUserid').get(validate.validate(validation.checkUserid), controller.checkUserid);

module.exports = router;
