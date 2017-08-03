;(function() {
	new Ajax({
		url: 'http://172.20.0.69:3004/score/grade',
		method: 'post',
		dataType: 'jsonp',
		data: {
			name: window.localStorage.name,
			username: window.localStorage.username,
			session: window.localStorage.session
		},
		success: function(data) {
			if (data.error) {
				new Popup({
					status: 'warning',
					message: '加载失败',
					promp: '请刷新试试~'
				});
				return;
			}
			var res = data.result;
			console.log(res[0]);
			var fragement = document.createDocumentFragment();
			for (var i = 0; i < res.length; i++) {
				var div = document.createElement('div');
				div.className = 'grade-box';
				
				div.innerHTML = '<p><span>学年：'+ res[i]['学年'] +'</span><span>学期：' + res[i]['学期'] + '</span></p><p>课程名称：' + 
				res[i]['课程名称'] + '</p><p><span>课程性质：' + res[i]['课程性质'] + '</span><span>学分：' +
				res[i]['学分'] + '</span></p><p>开课学院：' + res[i]['开课学院'] + '</p><p><span>成绩：' +
				res[i]['成绩'] + '</span><span>绩点：' + res[i]['绩点'] + '</span></p><p><span>补考成绩：' +
				res[i]['补考成绩'] + '</span><span>重修成绩：' + res[i]['重修成绩'] + '</span></p>';
				fragement.appendChild(div);
			}
			var wrapper = document.querySelector('.grade-wrapper');
			wrapper.appendChild(fragement);
		}
	});

	function toBack() {
		//console.log('ok');
		window.location.href = '../html/index.html';
	}

	var back = document.querySelector('.back');
	back.addEventListener('click', toBack);
})();