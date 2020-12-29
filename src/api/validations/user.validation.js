const Joi = require('joi');

module.exports = {
	// POST /v1/user/greet-me?name=<some_name>
	me: {
		query: Joi.object({
			name: Joi.string().required(),
		}),
		// you can write validations for body and param as well
		// body: {
		//     name: Joi.string().required(),
		// },
		// param: {
		//     name: Joi.string().required(),
		// },
	},
	test_mssql: {
		query: Joi.object({
			id: Joi.string().required(),
		}),
	},
	test_mssql_multiple_args: {
		query: Joi.object({
			id: Joi.string().required(),
			name: Joi.string().required(),
		}),
	},
	encrypt: {
		body: Joi.object({
			name: Joi.string().required(),
		}),
	},
	decrypt: {
		body: Joi.object({
			name: Joi.string().required(),
		}),
	},
};
