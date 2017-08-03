var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');


module.exports = function(data, callback) {
	var url = 'http://222.24.62.120/xsbkkscx.aspx?gnmkdm=N121618&xh=' + data.username + '&xm=' + encodeURI(data.name);

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
		var tr = $('#DataGrid1').find('tr');
		var result = [];

		for (var i = 0; i < tr.length - 1; i++) {
			var td = tr.eq(1 + i).find('td');
			var res = {
				classId: td.eq(0).text(),
				className: td.eq(1).text(),
				name: td.eq(2).text(),
				room: td.eq(3).text(),
				seat: td.eq(4).text(),
				style: td.eq(6).text() === "&nbsp;" ? "" : item.eq(7).text()
			};
			result.push(res);
		}

		callback(false, result);

	});
};