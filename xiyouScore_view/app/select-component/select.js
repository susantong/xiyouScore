;(function() {
	function Select(data) {
		this.show = data.show;
		this.dom = data.dom;
		this.init();
	}

	Select.prototype = {
		constructor: Select,
		init: function() {
			this.event();
		},
		createDom: function() {
			var border = getStyle(this.dom, 'border');
			var select = document.createElement('div');
			select.className = 'select';

			var fragment = document.createDocumentFragment();
			for (var i = 0; i < this.show.length; i++) {
				var p = document.createElement('p');
				p.innerHTML = this.show[i];
				fragment.appendChild(p);
			}
			select.appendChild(fragment);
			document.body.appendChild(select);
			select.style.cssText = "border: " + border + "; border-top: none; position: absolute; left: " + this.dom.offsetLeft + "px; top: " + (this.dom.offsetTop + this.dom.offsetHeight) + "px; z-index: 999; width: " 
			+ (this.dom.offsetWidth - 2*parseInt(getStyle(this.dom, 'borderWidth'))) + "px; text-align: center;";
		},
		event: function() {
			var that = this;
			//var select = document.querySelector('.select');
			document.body.addEventListener('click', consult, false);
			function consult(event) {
				var select = document.querySelector('.select');
				var e = event || window.event;
				if (e.target.nodeName.toLowerCase() === 'p') {
					var value = e.target.innerHTML;
					that.dom.innerHTML = value;
					document.body.removeEventListener('click', consult, false);
					select.parentNode.removeChild(select);
					
				} else if (e.target === that.dom) {
					if (select === null) {
						that.createDom();
					} else {
						document.body.removeEventListener('click', consult, false);
						select.parentNode.removeChild(select);
					}
				}else {
					if (select !== null) {
						document.body.removeEventListener('click', consult, false);
						select.parentNode.removeChild(select);			
					}
				} 
			}
		}
	};

	function getStyle(element, attr) {
		return window.getComputedStyle(element,null)[attr] || element.currentStyle[attr];
	}

	window.Select = Select;
})();