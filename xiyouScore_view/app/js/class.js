;(function() {
	new Ajax({
		method: 'post',
		url: 'http://172.20.0.69:3004/users/classes',
		dataType: 'jsonp',
		data: {
			username: window.localStorage.username,
			name: window.localStorage.name,
			session: window.localStorage.session,
			check: false
		},
		success: function(data) {
			if (data.error) {
				new Popup({
					status: 'warning',
					message: '查询失败',
					promp: '请重新试试~'
				});
				return;
			}
			var year = data.result.year;
			var month = data.result.month;
			var toCheck = document.querySelector('.toCheck');

			document.querySelector('.year').addEventListener('click', consult, false);
			document.querySelector('.month').addEventListener('click', desult, false);
			toCheck.addEventListener('click', toChecks, false);

			function consult() {
				new Select({
					show: year,
					dom: document.querySelector('.year')
				});
			}

			function desult() {
				new Select({
					show: month,
					dom: document.querySelector('.month')
				});
			}

		},
		error: function(status) {
			console.log(status);
		}
	});

	function toBack() {
		//console.log('ok');
		window.location.href = '../html/index.html';
	}

	function toChecks() {
		var year = document.querySelector('.year').innerHTML;
		var month = document.querySelector('.month').innerHTML;
		if (year === '选择学年') {
			new Popup({
				status: 'warning',
				message: '查询失败',
				promp: '请选择学年~'
			});
			return;
		} else if (month === '选择学期') {
			new Popup({
				status: 'warning',
				message: '查询失败',
				promp: '请选择学期~'
			});
			return;
		}
		new Ajax({
			method: 'post',
			url: 'http://localhost:3004/users/classes',
			dataType: 'jsonp',
			data: {
				username: window.localStorage.username,
				name: window.localStorage.name,
				session: window.localStorage.session,
				check: true,
				year: year,
				month: month
			},
			success: function(data) {
				if (data.error) {
					new Popup({
						status: 'error',
						message: '查询失败',
						promp: '请刷新试试~'
					});
				}
				
				var content = document.querySelector('.class-content');
				if (content) {
					content.parentNode.removeChild(content);
				}

				var date = ['一', '二', '三', '四', '五'];
				var color = ['#ffaa40', '#a8d242', '#f895d6', '#b092d8', '#39d4aa', '#35cdd8', '#f27d85']
				var table = document.createElement('div');
				var classes = data.result;
				var same = [];
				table.className = 'class-content';
				var str = '<div class="box-left"><div class="box-space"></div>';
				for (var i = 0; i < 5; i++) {
					str += '<div class="box-date">星<br />期<br />' + date[i] + '</div>';
				}
				str += '</div><div class="box-right"><div class="box-top"><span>上午</span><span>下午</span></div>';
				for (var i = 0; i < classes.length; i++) {
					var detail = classes[i].classes;
					str += '<div class="date-detail">';
					for (var j = 0; j < detail.length; j++) {
						if (detail[j]['classRoom'] !== undefined) {
							str += '<span>教室<br />' + detail[j]['classRoom'] + '<br /><br />课程<br />'
							+ detail[j]['className'] + '<br /><br />教师<br />' + detail[j]['teacherName']
							+ '</span>';
						} else {
							str += '<span></span>'
						}
					}
					str += '</div>';
				}
				
				table.innerHTML = str;
				var wrapper = document.querySelector('.class-wrapper');
				wrapper.appendChild(table);
			}
		});
	}

	var back = document.querySelector('.back');
	back.addEventListener('click', toBack);

})();