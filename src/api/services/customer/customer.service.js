var db = require('./../../repository/mssql/sql_db');

class CustomerService {
	static async getCustomer(payload, callback) {
		console.log('customerService getCustomer API');
		try {
			db.querySql(
				'SELECT * FROM [AdventureWorksLT2019].[SalesLT].[Customer] where CustomerID = @id',
				{ id: payload },
				function (err, result) {
					console.log('customerService getCustomer API: result: ' + JSON.stringify(result.recordset));
					callback(err, result.recordset);
					// if(err)
					//  	return err.message;
					// else
					//  	return (result.recordset);
				}
			);
		} catch (e) {
			// console.log('what is this? OMG: ' + e.message);
			// return e.message;
			callback(e);
		}
	}
}

module.exports = CustomerService;
