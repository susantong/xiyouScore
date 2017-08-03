var express = require('express');
var verCode = require('../modules/users/verCode');
var login = require('../modules/users/login');
var info = require('../modules/users/info');
var classes = require('../modules/users/classes');
var json = require('../modules/json');
var router = express.Router();


router.use('/verCode', function(req, res) {
	verCode(function(err, result) {
		json(res, err, result);
	});
});

router.use('/login', function(req, res) {
	
	login({
		username: req.param('username'),
		password: req.param('password'),
		session: req.param('session'),
		verCode: req.param('verCode')
	}, function(err, result) {
		json(res, err, result);
	});
});

router.use('/info', function(req, res) {
	var data = {
		name: req.param('name'),
		username: req.param('username'),
		session: req.param('session')
	};
	info(data, function(err, result) {
		json(res, err, result);
	});
});

router.use('/classes', function(req, res) {
	var data = {
		name: req.param('name'),
		username: req.param('username'),
		session: req.param('session'),
		year: req.param('year'),
		month: req.param('month'),
		check: req.param('check')
	};
	classes(data, function(err, result) {
		json(res, err, result);
	});
});

module.exports = router;
