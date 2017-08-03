var express = require('express');
var makeup = require('../modules/makeup/makeup');
var json = require('../modules/json');
var router = express.Router();

router.use('/makeup', function(req, res) {
	var data = {
		username: req.param('username'),
		name: req.param('name'),
		session: req.param('session')
	};
	makeup(data, function(err, result) {
		json(res, err, result);
	});
});

module.exports = router;