var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = function(data, callback) {
	var url = 'http://222.24.62.120/xscjcx.aspx?gnmkdm=N121605&xh=' + data.username + '&xm=' + encodeURI(data.name);
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
		
		if (body.indexOf('你还没有进行本学期的课堂教学评价') !== -1) {
			callback(true, 'Need Assess');
			return;
		}
		
		var $ = cheerio.load(body);
		var viewstate = $('input[name="__VIEWSTATE"]').val();
		//console.log(viewstate);
		checkGrade(data, viewstate, callback);
	});
}

function checkGrade(data, viewstate, callback) {
	var url = 'http://222.24.62.120/xscjcx.aspx?&gnmkdm=N121605&xh=' + data.username + '&xm=' + encodeURI(data.name);

	var formdata = {
		__EVENTTARGET: '',
		__EVENTARGUMENT: '',
		__VIEWSTATE: viewstate,
		hidLanguage: '',
		btn_zcj: '历年成绩',
		ddlXN: '',
		ddlXQ: '',
		ddl_kcxz: ''
	};

	request({
		url: url,
		method: 'POST',
		encoding: null,
		headers: {
			Referer: "http://222.24.62.120/xs_main.aspx?xh=" + data.username,
			Cookie: data.session
		},
		form: formdata
	}, function(err, res, body) {
		if (err) {
			callback(true, 'Server Error');
			return;
		}
		if(Math.floor(res.statusCode / 100) === 3)
		{
			callback(true, "Session Out");
			return;
		}

		body = iconv.decode(body, "GB2312").toString();
		var $ = cheerio.load(body);
		var tr = $('#Datagrid1').find('tr');
		var result = [];
		for (var i = 0; i < tr.length - 1; i++) {
			var res = {
				'学年': tr.eq(1 + i).find('td').eq(0).text(),
				'学期': tr.eq(1 + i).find('td').eq(1).text(),
				'课程名称': tr.eq(1 + i).find('td').eq(3).text(),
				'课程性质': tr.eq(1 + i).find('td').eq(4).text(),
				'学分': tr.eq(1 + i).find('td').eq(6).text(),
				'绩点': tr.eq(1 + i).find('td').eq(7).text(),
				'成绩': tr.eq(1 + i).find('td').eq(8).text(),
				'补考成绩': tr.eq(1 + i).find('td').eq(10).text(),
				'重修成绩': tr.eq(1 + i).find('td').eq(11).text(),
				'开课学院': tr.eq(1 + i).find('td').eq(12).text()
			};
			result.push(res);
		}

		callback(false, result);
	});
}