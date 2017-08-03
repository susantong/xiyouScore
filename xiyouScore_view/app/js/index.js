;(function() {
	if (!window.localStorage.name) {
		window.location.href = '../html/login.html';
	}

	var wrapper = document.querySelector('.index-wrapper');
	var exit = document.querySelector('.exit');
	wrapper.addEventListener('click', toChange);
	exit.addEventListener('click', toExit);

	function toChange(event) {
		var e = event || window.event;

		switch(e.target.id) {
			case 'person':
				window.location.href = '../html/info.html';
				break;
			case 'grade':
				window.location.href = '../html/grade.html';
				break;
			case 'class':
				window.location.href = '../html/class.html';
				break;
		}
	}	

	function toExit() {
		console.log('ok');
		window.localStorage.name = '';
		window.localStorage.username = '';
		window.localStorage.session = '';
		window.location.href = '../html/login.html';
	}
})();