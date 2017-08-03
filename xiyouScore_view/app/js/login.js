;(function() {
	var img = document.querySelector('.img');
	var btn = document.querySelector('.login-btn');
	btn.addEventListener('click', submits);
	img.addEventListener('click', getCode);

	window.onload = function() {
		getCode();
	};

	function submits() {
		var username = document.querySelector('#username').value;
		var password = document.querySelector('#password').value;
		var verCode = document.querySelector('#verCode').value;
		if (username === '') {
			new Popup({
				status: 'error',
				message: '请输入用户名',
				promp: '我知道了'
			});
			return;
		} else if (password === '') {
			new Popup({
				status: 'error',
				message: '请输入密码',
				promp: '我知道了'
			});
			return;
		} else if (verCode === '') {
			new Popup({
				status: 'error',
				message: '请输入验证码',
				promp: '我知道了'
			});
			return;
		}
		window.localStorage.username = document.querySelector('#username').value + '';
		new Ajax({
			method: 'post',
			url: 'http://172.20.0.69:3004/users/login',
			dataType: 'jsonp',
			data: {
				username: document.querySelector('#username').value + '',
				password: document.querySelector('#password').value,
				verCode: document.querySelector('#verCode').value,
				session: window.localStorage.session
			},
			success: function(data) {
				if (data.error) {
					new Popup({
						status: 'error',
						message: data.result,
						promp: '我知道了'
					});
					return;
				}
				window.localStorage.name = data.result;
				console.log('ok');
				var popup = new Popup({
					status: 'success',
					message: '登陆成功！',
					promp: '我知道了',
					callback: function() {
						window.location.href = '../html/index.html';
					}
				});
			},
			error: function(status) {
				console.log(status);
			}
		});
		
	}

	function getCode() {
		new Ajax({
			url: 'http://172.20.0.69:3004/users/verCode',
			method: 'get',
			dataType: 'jsonp',
			success: function(data) {

				if (data.error) {
					new Popup({
						status: 'error',
						message: '验证码请求错误，请点击图片刷新一下~',
						promp: '我知道了'
					});
					return;
				}
				console.log(data.result.verCode);
				img.src = data.result.verCode;
				window.localStorage.session = data.result.session;
			}
		});
	}
})();
