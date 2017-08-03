//获取验证码，返回session
var request = require('request');
var fs = require('fs');

module.exports = function(callback) {
	var url = 'http://222.24.62.120/CheckCode.aspx';

	request({
		url: url,
		method: 'GET',
		encoding: null,
		Accept: 'image/webp,image/*,*/*;q=0.8',
		headers: {
			Referer: 'http://222.24.62.120/'
		}
	}, function(err, res, body) {
		if (err) {
			callback(true, 'Server Error');
			return;
		}
		var session = res.headers['set-cookie'][0];
		session = session.substring(0, session.indexOf(';'));
		//console.log(session);
		if (!session) {
			callback(true, 'Server Error');
			return;
		}

		//console.log(body);
		var imgBuf = body.toString('base64');
		imgBuf = 'data:image/Gif;base64,' + imgBuf;
		callback(false, {
			session: session,
			verCode: imgBuf
		});
	});
};