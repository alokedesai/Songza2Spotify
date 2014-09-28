$(document).ready(function() {
  "use strict";

  var trackURL = "spotify:trackset:Songza:";

  var checkExist = setInterval(function() {
   		if ($(".miniplayer-info-track-title").length > 0) {
        addButton();
   		}
	}, 1000); // check every 100ms

  function addButton(trackURL) {
    if ($("#songza").length === 0) {
      var $linkToCurrent = $("<a>")
                            .attr("id", "songza")
                            .text("Open Current"),
        $add = $("<div>")
                .css("padding-left", "5px")
                .addClass("miniplayer-info-playlist-title")
                .append($linkToCurrent),
        $downloadLink = $("<a>")
                        .attr("id", "download")
                        .text("Open All"),
        $download = $("<div>")
                    .css("padding-left", "5px")
                    .addClass("miniplayer-info-playlist-title")
                    .append($downloadLink);

      $(".miniplayer-info-playlist").append($add);
      $(".miniplayer-info-playlist").append($download);

      var artist = $(".miniplayer-info-artist-name a").attr("title");
      var title = $(".miniplayer-info-track-title").text();
      setLink(title, artist);
    }
  }

  function setLink(title, artist) {
    var output = "";
    // make spotify request
    $.getJSON("https://api.spotify.com/v1/search?query=track:" + escape(title) + "+artist:" + escape(artist) + "&limit=20&type=track", function(result) {
      if (result["tracks"]["items"].length > 0) {    
        var currentTrackId = result["tracks"]["items"]["0"]["id"];
        trackURL += currentTrackId + ",";
        console.log(trackURL);
        addHandlers(trackURL, currentTrackId)
      }
    });
  }

  function addHandlers(trackURL, currentTrackId) {
    $("#download").click(function() {
      open(trackURL);
      focus();
    });

    $("#songza").click(function(){
      open("spotify:track:" + currentTrackId);
    });
  }
});