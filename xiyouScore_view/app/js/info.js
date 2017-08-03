;(function() {
	new Ajax({
		url: 'http://172.20.0.69:3004/users/info',
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
					status: 'error',
					message: '获取失败',
					promp: '请重新登录~',
					callback: function() {
						window.location.href = '../../html/login.html';
					}
				});
				return;
			}
			for (var item in data.result) {
				getDom(item).innerHTML = data.result[item];
			}
		}
	});

	var back = document.querySelector('.back');
	back.addEventListener('click', toBack);

	function getDom(el) {
		return document.querySelector('#' + el);
	}

	function toBack() {
		window.location.href = '../html/index.html';
	}
})();