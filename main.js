$(document).ready(function() {
  var currentSong = {};

  var checkExist = setInterval(function() {
   		if ($(".miniplayer-info-track-title").length) {
        // alert("Exists!");
        addButton();
   		}
	}, 1000); // check every 100ms


  function addButton() {
    var buttonString = "&nbsp; <div style='padding-left: 5px' class='miniplayer-info-playlist-title'> <a id='songza'> Open in Spotify </a> </div>";
    if (!($("#songza").length)) {
      $(".miniplayer-info-playlist").append(buttonString);


      currentSong["title"] = $(".miniplayer-info-track-title").text();
      currentSong["artist"] = $(".miniplayer-info-artist-name a").attr("title");

      var albumTitle = $(".miniplayer-info-album-title").text();
      currentSong["album"] = albumTitle.slice(5, albumTitle.length);
      console.log(currentSong);

      query = "https://api.spotify.com/v1/search?query=track:" + escape(currentSong["title"]) + "+artist:" + escape(currentSong["artist"]) + "&limit=20&type=track"
      console.log(query);
      // make spotify request
      $.getJSON(query, function(result) {
        console.log(result);
        // set the link 
        if (result["tracks"]["items"].length) {
          linkURL = result["tracks"]["items"]["0"]["external_urls"]["spotify"];
          $("#songza").attr("href", linkURL);
          $("#songza").attr("target", "_blank");
        }
      });
    }
  }



});