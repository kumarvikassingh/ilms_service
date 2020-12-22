const httpStatus = require('http-status');
const responseService = require('../services/response.service');
const customerService = require('../services/customer/customer.service');
var db = require('./../repository/mssql/sql_db.js');

exports.me = (req, res, next) => {
	try {
		const { name } = req.query;
		const response = responseService.greetUser(name);
		res.status(httpStatus.OK).json(response);
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

// exports.test_mssql = (req, res, next) => {
// 	console.log('Calling user.controller test_mssql API: ' + JSON.stringify(req.query));
// 	try {
// 		db.querySql(
// 			// 'select * from table_name where id = @id order by dataid',
// 			'SELECT * FROM [AdventureWorksLT2019].[SalesLT].[Customer] where CustomerID = @id',
// 			{ id: req.query.id },
// 			function (err, result) {
// 				res.json(result.recordset);
// 			}
// 		);
// 	} catch (e) {
// 		next(e);
// 	}
// };
