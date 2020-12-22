var app = {
	user: process.env.user,
	password: process.env.password,
	server: process.env.server,
	database: process.env.database,
	port: 1433,
	options: {
		encrypt: false, // Use this if you're on Windows Azure
	},
	pool: {
		min: 0,
		max: 10,
		idleTimeoutMillis: 3000,
	},
};

module.exports = app;
