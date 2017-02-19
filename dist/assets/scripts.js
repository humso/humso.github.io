/*! Starter - v1.0.0 - 2017-02-18 */// Is js working?

$(function() {
	console.log('JS is working');
});




// toggle grid overlay

$(function() {
	var toggle = function() {
		var on = false;
		return function() {
			if(!on) {
				on = true;
				// Do stuff if OFF
				console.log("click off");
				$(".grid--overlay").remove();
				return;
			}
			// Do stuff if ON
			console.log("click on");
			$("body").append(' <div class="grid grid--overlay"></div>');
			for (var i = 1; i <= 12; i+=1) {
				$(".grid--overlay").append(' <div class="grid__col--1 grid__col--overlay"><small>col'+ i +'</small></div>');
			}
			on = false;
		};
	}();

	// Set OFF as default
	toggle();

	document.addEventListener('keydown', function(event) {
		var key = event.keycode || event.which;
		if (key === 71) { // if key === g
			toggle();
		}
	}, false);

});
