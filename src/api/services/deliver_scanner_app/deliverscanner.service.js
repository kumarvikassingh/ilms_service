var db = require('./../../repository/mssql/sql_db');

class DeliverScannerService {
	// This is the final method. COmmenting it out for testing purpose.
	// @Era, please uncomment this method for testing purpose
	/*
	static async CheckUserid(payload, callback) {
        let style  = payload.style;
        let userId = payload.userId;
        let password = payload.password;

        var finalQuery = '';

		try {
            if(style === 1) {
                finalQuery = 'Select * FROM pwdUsers_Scanners WHERE UserID= @userId and Active = 1';
            }
            else if (style === 2) {
                finalQuery = 'Select * FROM pwdUsers_Scanners WHERE UserID= @userId and Password = @password and Active = 1';
            }

			db.querySql(
				finalQuery,
				{ userId: userId, password: password },
				function (err, result) {
					console.debug('Result: ' + JSON.stringify(result.recordset));
					callback(err, result.recordset);
				}
			);
		} catch (e) {
			callback(e);
		}
	}
	*/

	static async CheckUserid(payload, callback) {
		console.debug('payload: ' + JSON.stringify(payload));
		var result = {
			Description: 'Sample Description',
			ID: 'Sample ID',
			SuperScan: 1,
			Active: 1,
			TeamLeader: 1,
			GroupLeader: 1,
			SystemAdmin: 0,
			ISAdmin: 0,
			AllowDelivery: 1,
			AllowFreight: 1,
			AllowQuarantine: 0,
		};

		callback(null, result);
	}
}
module.exports = DeliverScannerService;
