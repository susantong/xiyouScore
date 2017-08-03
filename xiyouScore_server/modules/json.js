module.exports = function(res, err, result) {
	if (err) {
		res.jsonp({
			error: true,
			result: result
		});
	} else {
		res.jsonp({
			error: false,
			result: result
		});
	}
};