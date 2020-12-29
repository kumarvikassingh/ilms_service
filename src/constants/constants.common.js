/**
 * Common constants across all the environments (dev, staging, prod)
 */
module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	crypto: {
		algorithm: 'aes-256-ctr',
		password: 'password',
		encoding: 'hex',
		inputEncoding: 'utf8',
		securityKey: 'DaVinci',
		pgAlgorithm: 'aes-192-cbc',
	},
};
