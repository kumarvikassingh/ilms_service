/**
 *sqserver Model
 **/
var mssql = require('mssql');
var conf = require('./../../../config/sql_db_config.js');

var restoreDefaults = function () {
	conf;
};
var getConnection = function (callback) {
	if (!callback) {
		callback = function () {};
	}
	console.log(conf);
	var con = new mssql.ConnectionPool(conf, function (err) {
		if (err) {
			throw err;
		}
		callback(con);
	});
};
var querySql = function (sql, params, callBack) {
	getConnection(function (connection) {
		var ps = new mssql.PreparedStatement(connection);
		if (params != '') {
			for (var index in params) {
				if (typeof params[index] == 'number') {
					ps.input(index, mssql.Int);
				} else if (typeof params[index] == 'string') {
					ps.input(index, mssql.NVarChar);
				}
			}
		}
		ps.prepare(sql, function (err) {
			if (err) console.log(err);
			ps.execute(params, function (err, recordset) {
				callBack(err, recordset);
				ps.unprepare(function (err) {
					if (err) console.log(err);
				});
			});
		});
	});
	restoreDefaults();
};

var select = function (tableName, topNumber, whereSql, params, orderSql, callBack) {
	getConnection(function (connection) {
		var ps = new mssql.PreparedStatement(connection);
		var sql = 'select * from ' + tableName + ' ';
		if (topNumber != '') {
			sql = 'select top(' + topNumber + ') * from ' + tableName + ' ';
		}
		sql += whereSql + ' ';
		if (params != '') {
			for (var index in params) {
				if (typeof params[index] == 'number') {
					ps.input(index, mssql.Int);
				} else if (typeof params[index] == 'string') {
					ps.input(index, mssql.NVarChar);
				}
			}
		}
		sql += orderSql;
		console.log(sql);
		ps.prepare(sql, function (err) {
			if (err) console.log(err);
			ps.execute(params, function (err, recordset) {
				callBack(err, recordset);
				ps.unprepare(function (err) {
					if (err) console.log(err);
				});
			});
		});
	});
	restoreDefaults();
};

var selectAll = function (tableName, callBack) {
	getConnection(function (connection) {
		var ps = new mssql.PreparedStatement(connection);
		var sql = 'select * from ' + tableName + ' ';
		ps.prepare(sql, function (err) {
			if (err) console.log(err);
			ps.execute('', function (err, recordset) {
				callBack(err, recordset);
				ps.unprepare(function (err) {
					if (err) console.log(err);
				});
			});
		});
	});
	restoreDefaults();
};

var add = function (addObj, tableName, callBack) {
	getConnection(function (connection) {
		var ps = new mssql.PreparedStatement(connection);
		var sql = 'insert into ' + tableName + '(';
		if (addObj != '') {
			for (var index in addObj) {
				if (typeof addObj[index] == 'number') {
					ps.input(index, mssql.Int);
				} else if (typeof addObj[index] == 'string') {
					ps.input(index, mssql.NVarChar);
				}
				sql += index + ',';
			}
			sql = sql.substring(0, sql.length - 1) + ') values(';
			for (var index in addObj) {
				if (typeof addObj[index] == 'number') {
					sql += addObj[index] + ',';
				} else if (typeof addObj[index] == 'string') {
					sql += "'" + addObj[index] + "'" + ',';
				}
			}
		}
		sql = sql.substring(0, sql.length - 1) + ')';
		ps.prepare(sql, function (err) {
			if (err) console.log(err);
			ps.execute(addObj, function (err, recordset) {
				callBack(err, recordset);
				ps.unprepare(function (err) {
					if (err) console.log(err);
				});
			});
		});
	});
	restoreDefaults();
};

var update = function (updateObj, whereObj, tableName, callBack) {
	getConnection(function (connection) {
		var ps = new mssql.PreparedStatement(connection);
		var sql = 'update ' + tableName + ' set ';
		if (updateObj != '') {
			for (var index in updateObj) {
				if (typeof updateObj[index] == 'number') {
					ps.input(index, mssql.Int);
					sql += index + '=' + updateObj[index] + ',';
				} else if (typeof updateObj[index] == 'string') {
					ps.input(index, mssql.NVarChar);
					sql += index + '=' + "'" + updateObj[index] + "'" + ',';
				}
			}
		}
		sql = sql.substring(0, sql.length - 1) + ' where ';
		if (whereObj != '') {
			for (var index in whereObj) {
				if (typeof whereObj[index] == 'number') {
					ps.input(index, mssql.Int);
					sql += index + '=' + whereObj[index] + ' and ';
				} else if (typeof whereObj[index] == 'string') {
					ps.input(index, mssql.NVarChar);
					sql += index + '=' + "'" + whereObj[index] + "'" + ' and ';
				}
			}
		}
		sql = sql.substring(0, sql.length - 5);
		ps.prepare(sql, function (err) {
			if (err) console.log(err);
			ps.execute(updateObj, function (err, recordset) {
				callBack(err, recordset);
				ps.unprepare(function (err) {
					if (err) console.log(err);
				});
			});
		});
	});
	restoreDefaults();
};

var del = function (whereSql, params, tableName, callBack) {
	getConnection(function (connection) {
		var ps = new mssql.PreparedStatement(connection);
		var sql = 'delete from ' + tableName + ' ';
		if (params != '') {
			for (var index in params) {
				if (typeof params[index] == 'number') {
					ps.input(index, mssql.Int);
				} else if (typeof params[index] == 'string') {
					ps.input(index, mssql.NVarChar);
				}
			}
		}
		sql += whereSql;
		ps.prepare(sql, function (err) {
			if (err) console.log(err);
			ps.execute(params, function (err, recordset) {
				callBack(err, recordset);
				ps.unprepare(function (err) {
					if (err) console.log(err);
				});
			});
		});
	});
	restoreDefaults();
};

exports.config = conf;
exports.del = del;
exports.select = select;
exports.update = update;
exports.querySql = querySql;
exports.selectAll = selectAll;
exports.restoreDefaults = restoreDefaults;
exports.add = add;
