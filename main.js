$(document).ready(function() {
	var checkExist = setInterval(function() {
   		if ($('.miniplayer-controls').length) {
	     alert("Exists!");
	      clearInterval(checkExist);
   		}
	}, 100); // check every 100ms
});
