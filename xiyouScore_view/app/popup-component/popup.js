;(function() {
	function Popup(data) {
		this.status = data.status;
		this.message = data.message;
		this.promp = data.promp;
		this.callback = data.callback === undefined ? null : data.callback;
		this.color = {
			info: '#4c8bf5',
			success: '#71c341',
			error: '#de5246',
			warning: '#f39c12'
		};
		this.init();
	}

	Popup.prototype = {
		constructor: Popup,
		init: function() {
			this.html();
			this.clickEvent();
		},
		html: function() {
			var mask = document.createElement('div');
			var popup = document.createElement('div');
			mask.className = 'mask';
			popup.className = 'popup';
			document.body.appendChild(mask);
			document.body.appendChild(popup);
			var message = this.getTitle();
			popup = document.querySelector('.popup');
			popup.innerHTML  = '<div class="popup-logo"></div><h2 class="popup-title">' + message + '</h2><p class="popup-message">' + this.message + '</p><div class="popup-btn">' + this.promp + '</div>';
			
			var logo = document.querySelector('.popup-logo');
			var btn = document.querySelector('.popup-btn');
			btn.style.backgroundColor = this.color[this.status];
			logo.style.background = 'url(/popup-component/images/' + this.status + '.png) no-repeat center';
			logo.style.backgroundSize = '100% 100%';
			logo.style.top = -logo.offsetHeight/2 + 'px';
			document.querySelector('html').style.fontSize = this.rem + 'px';
		},
		getTitle: function() {
			var data = '';
			console.log(this.status);
			switch(this.status) {
				case 'info':
					message = '提示';
					break;
				case 'success':
					message = '成功';
					break;
				case 'error':
					message = '错误';
					break;
				case 'warning':
					message = '警告';
					break;
			}

			return message;
		},
		clickEvent: function() {
			var btn = document.querySelector('.popup-btn');
			btn.addEventListener('touchstart', cancel);
			var that = this;

			function cancel() {
				var mask = document.querySelector('.mask');
				var popup = document.querySelector('.popup');
				mask.parentNode.removeChild(mask);
				popup.parentNode.removeChild(popup);
				if (that.callback) {
					that.callback();
				}
			}
		}
	};

	window.Popup = Popup;
})();