$(document).ready(function() {
  var trackURL = "spotify:trackset:Songza:";
  var currentSong = {};

  var checkExist = setInterval(function() {
   		if ($(".miniplayer-info-track-title").length) {
        addButton();
   		}
	}, 1000); // check every 100ms

  function addButton() {
    if (!($("#songza").length)) {
      var addString = "<div style='padding-left: 5px' class='miniplayer-info-playlist-title'> <a id='songza'> Open Current </a> </div>";
      var downloadString = "&nbsp; <div style='padding-left: 5px' class='miniplayer-info-playlist-title'> <a id='download'> Open All </a> </div>";
      $(".miniplayer-info-playlist").append(addString);
      $(".miniplayer-info-playlist").append(downloadString);
      
      // reset the trackURL back to it's original value
      var trackURL = "spotify:trackset:Songza:";

      setCurrentSong();
      setLink();
      addHandlers();
    }
  }

  function setCurrentSong() {
    currentSong["title"] = $(".miniplayer-info-track-title").text();
    currentSong["artist"] = $(".miniplayer-info-artist-name a").attr("title");
    albumTitle = $(".miniplayer-info-album-title").text();
    currentSong["album"] = albumTitle.slice(5, albumTitle.length);
  }

  function setLink() {
    // make spotify request
    $.getJSON("https://api.spotify.com/v1/search?query=track:" + escape(currentSong["title"]) + "+artist:" + escape(currentSong["artist"]) + "&limit=20&type=track", function(result) {
      // set the link 
      if (result["tracks"]["items"].length) {
        
        // update uri of currentSong
        currentSong["uri"] = result["tracks"]["items"]["0"]["id"];
        trackURL += currentSong["uri"] + ",";
      }
    });
  }

  function addHandler() {
    $("#download").click(function() {
      window.open(trackURL);
    });
  }
});