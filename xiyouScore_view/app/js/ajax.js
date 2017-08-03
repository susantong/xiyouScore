;(function() {
	function Ajax(obj) {
		this.url = obj.url; 
		this.method = (obj.method).toLowerCase() === undefined ? 'GET' : (obj.method).toUpperCase();
		this.dataType = obj.dataType === undefined ? 'XML' : (obj.dataType).toUpperCase();
		this.data = obj.data === undefined ? '' : obj.data;
		this.async = obj.async === undefined ? true : obj.async;
		this.success = obj.success;
		this.error = obj.error;
		this.xml = null;
		this.init();
	}

	Ajax.prototype = {
		constructor: Ajax,
		init: function() {
			this.create();
		},
		create: function() {
			if (window.XMLHttpRequest) {
				this.xml = new XMLHttpRequest();
			} else {
				this.xml = new ActiveXObject('Microsoft.XMLHTTP');
			}
			this.stringfy();
			if (this.dataType === 'JSON') {
				this.getJson();
			} else if (this.dataType === 'JSONP') {
				this.getJsonp();
			}
		},
		stringfy: function() {
			var str = '';
			if (typeof this.data === 'object') {
				for (var key in this.data) {
					str += '&' + key + '=' + this.data[key];
				}
				str = str.substring(1);
			}
			this.data = str;
		},
		getJson: function() {
			this.url = this.url + '?rand=' + Math.random();
			
			var callback = function() {
				if (this.xml == 200) {
					this.success(this.xml.responseText);
				} else {
					this.error(this.xml.status);
				}
			};
			if (this.async) {
				this.xml.onreadystatechange = function() {
					if (this.xml.readyState == 4) {
						callback();
					}
				};
			}
			this.xml.open(this.method, this.url, this.async);

			if (this.method == 'GET') {
				this.url = this.url + '&' + this.data;
				this.xml.send(null);
			} else {
				this.xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
				this.xml.send(this.data);
			}

			if (!this.xml.async) {
				callback();
			}
		},
		getJsonp: function() {
			var head = document.querySelector('head');
			var that = this;
			var script = document.createElement('script');
			script.type = "text/javascript";
			var callbackName = 'callback' + new Date().getTime();
			script.src = this.url + '?' + this.data + '&callback=' + callbackName;
			head.appendChild(script);
			//回调
			window[callbackName] = function(data) {
				//console.log(data);
				that.success(data);
				head.removeChild(script);
			};
		}
	};

	window.Ajax = Ajax;
})();