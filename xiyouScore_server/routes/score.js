var express = require('express');
var grade = require('../modules/score/grade');
var year = require('../modules/score/year');
var json = require('../modules/json');
var router = express.Router();

router.use('/grade', function(req, res) {
	var data = {
		name: req.param('name'),
		username: req.param('username'),
		session: req.param('session')
	};
	grade(data, function(err, result) {
		json(res, err, result);
	});
});

router.use('/year', function(req, res) {
	var data = {
		name: req.param('name'),
		username: req.param('username'),
		session: req.param('session'),
		year: req.param('year'),
		semaster: req.param('semaster')
	};
	year(data, function(err, result) {
		json(res, err, result);
	});
});

module.exports = router;