$(document).ready(function() {
	var checkExist = setInterval(function() {
   		if ($(".miniplayer-info-playlist").length) {
        alert("Exists!");
        addButton();
   		}
	}, 300); // check every 100ms
});
var currentSong = {}

function addButton() {
  var buttonString = "&nbsp; <div class='miniplayer-info-playlist-title' id='songza' style='color:#3385ff'>ADD TO SPOTIFY </div>";
  if (!($("#songza").length)) {
    $(".miniplayer-info-playlist").append(buttonString);
  }
}

