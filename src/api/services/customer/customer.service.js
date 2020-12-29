var db = require('./../../repository/mssql/sql_db');

class CustomerService {
	static async getCustomer(payload, callback) {
		console.debug('customerService getCustomer API');
		try {
			db.querySql(
				'SELECT * FROM [AdventureWorksLT2019].[SalesLT].[Customer] where CustomerID = @id',
				{ id: payload },
				function (err, result) {
					console.debug('customerService getCustomer API: result: ' + JSON.stringify(result.recordset));
					callback(err, result.recordset);
					// if(err)
					//  	return err.message;
					// else
					//  	return (result.recordset);
				}
			);
		} catch (e) {
			// console.debug('what is this? OMG: ' + e.message);
			// return e.message;
			callback(e);
		}
	}

	static async getCustomer2(payload, callback) {
		console.debug('customerService getCustomer2 API');
		try {
			db.querySql(
				'SELECT * FROM [AdventureWorksLT2019].[SalesLT].[Customer] where CustomerID = @id OR LastName = @name',
				{ id: payload.id, name: payload.name },
				function (err, result) {
					console.debug('customerService getCustomer2 API: result: ' + JSON.stringify(result.recordset));
					callback(err, result.recordset);
				}
			);
		} catch (e) {
			callback(e);
		}
	}
}

module.exports = CustomerService;
