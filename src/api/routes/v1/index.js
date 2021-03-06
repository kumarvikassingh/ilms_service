const express = require('express');

// import all the routes here
const userRoutes = require('./user.route');
const deliverscannerRoutes = require('./deliverscanner.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.use('/user', userRoutes);
router.use('/deliverscanner', deliverscannerRoutes);

module.exports = router;
