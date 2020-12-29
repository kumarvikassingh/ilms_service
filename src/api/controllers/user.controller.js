const httpStatus = require('http-status');
const responseService = require('../services/response.service');
const customerService = require('../services/customer/customer.service');
const cryptoService = require('../services/common/crypto.service');
var db = require('./../repository/mssql/sql_db.js');

exports.me = (req, res, next) => {
	try {
		const { name } = req.query;
		let cryptoText = '';

		cryptoService.encrypt(name, function (result) {
			cryptoText = result;
			console.log('Encrypted data: ' + cryptoText);
		});

		cryptoService.decrypt(cryptoText, function (result) {
			console.log('decrypt data: ' + result);
		});

		const response = responseService.greetUser(name);
		res.status(httpStatus.OK).json(response);
	} catch (e) {
		next(e);
	}
};

exports.encrypt = (req, res, next) => {
	try {
		console.log('encrypt: START');
		const { name } = req.body;
		console.log('encrypt: name: ' + name);
		cryptoService.encrypt(name, function (result) {
			console.log('Encrypted data: ' + result);
			res.status(httpStatus.OK).json(result);
		});
	} catch (e) {
		next(e);
	}
};

exports.decrypt = (req, res, next) => {
	try {
		console.debug('decrypt: START');
		const { name } = req.body;
		cryptoService.decrypt(name, function (result) {
			console.debug('Decrypted data: ' + result);
			res.status(httpStatus.OK).json(result);
		});
	} catch (e) {
		next(e);
	}
};

exports.test_mssql = (req, res, next) => {
	console.log('Calling user.controller test_mssql API: ' + JSON.stringify(req.query));
	try {
		const { id } = req.query;
		console.log('user.controller test_mssql calling customerService.getCustomer');
		customerService.getCustomer(id, function (err, result) {
			if (err) {
				console.log('user.controller test_mssql ERROR: ' + err);
				return err.message;
			} else {
				console.log('user.controller test_mssql response: ' + JSON.stringify(result));
				res.status(httpStatus.OK).json(result);
			}
		});
	} catch (e) {
		next(e);
	}
};
