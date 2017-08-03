var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = function(data, callback) {
	var url = 'http://222.24.62.120/xsgrxx.aspx?gnmkdm=N121501&xh=' + data.username + '&xm=' + encodeURI(data.name);
	request({
		url: url,
		method: 'GET',
		encoding: null,
		headers: {
			Referer: 'http://222.24.62.120/xs_main.aspx?xh=' + data.username,
			Cookie: data.session
		}
	}, function(err, res, body) {
		if (err) {
			callback(true, 'Server Error');
			return;
		}

		if(Math.floor(res.statusCode / 100) === 3) {
			console.log('session');
			callback(true, 'session out');
			return;
		}


		body = iconv.decode(body, "GB2312").toString();
		var $ = cheerio.load(body);
		var results = {};
		results.username = $('#xh').text();
		results.name = $('#xm').text();
		results.sex = $('#lbl_xb').text();
		results.birthDay = $('#lbl_csrq').text();
		results.nation = $('#lbl_mz').text();
		results.status = $('#lbl_zzmm').text();
		results.provence = $('#lbl_lys').text();
		results.educational = $('#lbl_CC').text();
		results.collega = $('#lbl_xy').text();
		results.major = $('#lbl_zymc').text();
		results.class = $('#lbl_xzb').text();
		results.grade = $('#lbl_dqszj').text();

		console.log(results);
		callback(false, results);
	});
}