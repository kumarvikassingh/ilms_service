const httpStatus = require('http-status');
const deliverScannerService = require('../services/deliver_scanner_app/deliverscanner.service');
const cryptoService = require('../services/common/crypto.service');
var db = require('./../repository/mssql/sql_db.js');

exports.checkUserid = (req, res, next) => {
	try {
		deliverScannerService.CheckUserid(req.query, function (err, result) {
			if (err) {
				console.debug('deliverscanner.controller checkUserid error: ' + err.message);
				res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
			} else {
				console.debug('deliverscanner.controller checkUserid response: ' + JSON.stringify(result));
				var formattedResult = convertToUserIdResult(req.query, result);
				res.status(httpStatus.OK).json(formattedResult);
			}
		});
	} catch (e) {
		next(e);
	}
};

/**
 * Converts DB user information to the format that Angular client app is expecting.
 * Here, we are
 * - checking if user cred is correct or not
 * - Checking if user has permission to access the app
 * - Checking user's roles and permissions
 * - Returning one extra variable which will tell the status of user info details
 * - The values include
 * -	0: 	If soething goes wrong
 * -	1:	Valid user
 * -	2: Valid team leader
 * -	3: Valid Group Leader
 * - 	4: Valid System Admin
 * -	5:	Valid IS Admin
 * -	11: User does not exist, disabled or incorrect credentials
 * @param {JSON} req - The query of requese object. It has user id, password, app name information
 * @param {JSON} result - result object coming from DB object
 * @returns {JSON} - Returns json Object with the format user is expecting
 */
function convertToUserIdResult(req, result) {
	if (result == null) {
		return { status: 11 };
	}

	var formattedResult = {
		style: req.style,
		userId: req.userId,
		appName: req.appName, // Ex: 'Delivery',
		description: result.Description,
		id: result.ID,
		superScan: result.SuperScan,
		active: result.Active,
		teamLeader: result.TeamLeader,
		groupLeader: result.GroupLeader,
		systemAdmin: result.SystemAdmin,
		isAdmin: result.ISAdmin,
		allowApp: result.AllowDelivery, // Default is for Delivery app
		status: 1,
	};

	if (result.TeamLeader === 1) {
		formattedResult.status = 2;
	}
	if (result.GroupLeader === 1) {
		formattedResult.status = 3;
	}
	if (result.SystemAdmin === 1) {
		formattedResult.status = 4;
	}
	if (result.ISAdmin === 1) {
		formattedResult.status = 5;
	}

	if (req.appName === 'Delivery') {
		formattedResult.allowApp = result.AllowDelivery;
	} else if (req.appName === 'Freight') {
		formattedResult.allowApp = result.AllowFreight;
	} else if (req.appName === 'Quarantine') {
		formattedResult.allowApp = result.AllowQuarantine;
	} else {
		formattedResult.allowApp = 0;
	}

	return formattedResult;
}
