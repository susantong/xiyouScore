var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = function(data, callback) {
	var url = 'http://222.24.62.120/xskbcx.aspx?gnmkdm=N121603&xh=' + data.username + '&xm=' + encodeURI(data.name);
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
	
		var $ = cheerio.load(body, {decodeEntities: false});
		
		var viewstate = $('input[name="__VIEWSTATE"]').val();

		if (data.check === 'true') {
			checkClasses(data, viewstate, callback);
		} else {
			var inputValue = {
				year: [],
				month: []
			};
			var option1 = $('#xnd').find('option');
			var option2 = $('#xqd').find('option');
	              
			for (var i = 0; i < option1.length; i++) {
				inputValue.year.push(option1.eq(i).val());
			}
			for (var i = 0; i < option2.length; i++) {
				inputValue.month.push(option2.eq(i).val());
			}
			callback(false, inputValue);
		}
	});
};

function checkClasses(data, viewstate, callback) {
	var url = 'http://222.24.62.120/xskbcx.aspx?gnmkdm=N121603&xh=' + data.username + '&xm=' + encodeURI(data.name);

	var formdata = {
		__EVENTTARGET: '',
		__EVENTARGUMENT: '',
		__VIEWSTATE: viewstate,
		xnd: data.year,
		xqd: data.month
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
		//var $ = cheerio.load(body);
		var $ = cheerio.load(body, {decodeEntities: false})
		var results = [];
		
		var tr = $('#Table1').find('tr');
		//console.log(tr.eq(2).find('td').eq(2).html())
		for (var i = 0; i < 5; i++) {
			var res = {
				time: i + 1,
				classes: []
			};
			res.classes.push(dataResult(tr.eq(2).find('td').eq(2 + i).html()));
			res.classes.push(dataResult(tr.eq(4).find('td').eq(1 + i).html()));
			res.classes.push(dataResult(tr.eq(6).find('td').eq(2 + i).html()));
			res.classes.push(dataResult(tr.eq(8).find('td').eq(1 + i).html()));
			results.push(res);
		}
		callback(false, results);
	});
}

function dataResult(text) {
	var data = text.split('<br>');
	var obj = {};

	if (data.length > 1) {
		obj = {
			className: data[0],
			teacherName: data[2],
			classRoom: data[3]
		};
	}

	if (data.length > 5) {
		obj = {
			className: data[4],
			teacherName: data[6],
			classRoom: data[7]
		};
	}

	return obj;

}