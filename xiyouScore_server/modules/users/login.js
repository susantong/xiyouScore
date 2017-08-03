var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

function login(data, callback) {
	console.log(data);
	if (!data.username || !data.password) {
		callback(true, 'Account Error');
		return;
	}

	var url = 'http://222.24.62.120/default2.aspx';

	var formdata = {
		'__VIEWSTATE': 'dDwtNTE2MjI4MTQ7Oz5O9kSeYykjfN0r53Yqhqckbvd83A==',
		'txtUserName': data.username,
		'TextBox2': data.password,
		'txtSecretCode': data.verCode,
		'RadioButtonList1': '%D1%A7%C9%FA',
		'Button1': '',
		'lbLanguage': '',
		'hidPdrs': '',
		'hidsc': ''
	};

	request({
		url: url,
		method: 'POST',
		form: formdata,
		headers: {
			Referer: 'http://222.24.62.120/',
			Cookie: data.session
		}
	}, function(err, res, body) {
		if (err) {
			callback(true, 'Server Error');
			return;
		}
		
		var isSuccess = body.indexOf('Object moved');
		if (isSuccess == -1) {
			callback(true, 'Please check your password or verCode');
			return;
		}

		getName(data, callback);
	});
}

function getName(data, callback) {
	//发起重定向的请求
	var url = 'http://222.24.62.120/xs_main.aspx?xh=' + data.username;
	request({
		url: url,
		method: 'GET',
		encoding: null,
		headers: {
			Referer: 'http://222.24.62.120/',
			Cookie: data.session
		}
	}, function(err, res, body) {
		if (err) {
			callback(true, err);
			return;
		}
		var body = iconv.decode(body, 'GB2312').toString();
		var $ = cheerio.load(body);
		var name = $('#xhxm').text().replace('同学', '');

		callback(false, name);
	});
}

module.exports = login;