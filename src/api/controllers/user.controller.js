const httpStatus = require('http-status');
const responseService = require('../services/response.service');

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
	try {
		db.querySql(
			'select * from table_name where id = @id order by dataid',
			{ id: req.params.id },
			function (err, result) {
				res.json(result.recordset);
			}
		);
	} catch (e) {
		next(e);
	}
};
