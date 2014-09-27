$(document).ready(function() {
  var currentSong = {};
	
  var checkExist = setInterval(function() {
   		if ($(".miniplayer-info-track-title").length) {
        // alert("Exists!");
        addButton();
   		}
	}, 1000); // check every 100ms


  function addButton() {
    var buttonString = "&nbsp; <a class='miniplayer-info-playlist-title' id='songza'> OPEN IN SPOTIFY </a>";
    if (!($("#songza").length)) {
      $(".miniplayer-info-playlist").append(buttonString);
      currentSong["title"] = $(".miniplayer-info-track-title").text();
      currentSong["artist"] = $(".miniplayer-info-artist-name a").attr("title");

      var albumTitle = $(".miniplayer-info-album-title").text();
      currentSong["album"] = albumTitle.slice(5, albumTitle.length);
      console.log(currentSong);
      // add event handler
      $("#songza").click(function(){
        console.log(currentSong["title"]);
      });
    }
  }



});