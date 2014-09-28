$(document).ready(function() {
  "use strict";

  var trackURL = "spotify:trackset:Songza:";
  var checkExist = setInterval(function() {
   		if ($(".miniplayer-info-track-title").length > 0) {
        addButton();
   		}
	}, 1000); // check every 100ms
  var songs;
  var allowDownload = true;

  function addButton(trackURL) {
    // we only want stuff to happen if we haven't already added anything 
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
      setLink(title, artist, true);
    }
  }

  function setLink(title, artist, addHandler) {
    var output = "";
    // make spotify request
    $.getJSON("https://api.spotify.com/v1/search?query=track:" + escape(title) + "+artist:" + escape(artist) + "&limit=20&type=track", function(result) {
      if (result["tracks"]["items"].length > 0) {    
        var currentTrackId = result["tracks"]["items"]["0"]["id"];
        trackURL += currentTrackId + ",";
        console.log(trackURL);
        if (addHandler){
          addHandlers(currentTrackId);
        }
      }
    });
  }

  function addHandlers(currentTrackId) {
    $("#download").click(function() {
      if (allowDownload) {
        allowDownload = false;
        var c = confirm("Are you sure you want to download the rest of the songs on this playlist? This may take around 30 seconds. Spotify will open will the songs when it's ready!");
        if (c) {
          songs = setInterval(getRest, 500);
        }  
      } else {
        alert("We're currently trying to download the songs. Please wait until trying this again.");
      }
    });

    $("#songza").click(function(){
      open("spotify:track:" + currentTrackId);
    });
  }

  function getRest() {
    var station_id = $(".miniplayer-info-playlist-favorite-status").attr("data-sz-station-id");
    $.getJSON("http://songza.com/api/1/station/" + station_id + "/next", function(result){
      var title = result["song"]["title"];
      var artist = result["song"]["artist"]["name"];
      setLink(title, artist, false);
    }).fail(function(jqXHR){
        if (jqXHR.status == 403) {
          // if we're forbidden, we end the iterating
          end();
        }
    });   
  }

  function end() {
    clearInterval(songs);
    open(trackURL);
    allowDownload = true;
  }

});