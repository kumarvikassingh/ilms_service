const Joi = require('joi');

module.exports = {
	checkUserid: {
		query: Joi.object({
			style: Joi.number().required(),
			userId: Joi.string().required(),
			password: Joi.string().optional(),
			appName: Joi.string().required(),
		}),
	},
};
