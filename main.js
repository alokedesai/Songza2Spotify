$(document).ready(function() {
  'use strict'	 ;
  
  /*
  THIS CODE WILL NOT WORK!!!
  That little strict statement should keep you from using the global scope,
  (or in this case the scope local to the callback given to $(document).ready)
  The tl;dr of a very long rant, don't use the global scope: it hurts your
  ability to easily change the code in the future. Always think about ways
  to contain the definition and use of a variable to a local scope. If several
  functions need access, pass said variable as a parameter (this is known as 
  dependency injection in programming parlance). I fixed up some of the element
  creation further down, but its 2AM so I don't really have time for more!
  
  I'll gladly help you further though :)
  
  - Audun
  */
  
  
  var trackURL = "spotify:trackset:Songza:",
      currentSong = {};

  var checkExist = setInterval(function() {
   		if ($(".miniplayer-info-track-title").length > 0) {
        addButton();
   		}
	}, 1000); // check every 100ms

  function addButton() {
    if ($("#songza").length === 0) {
      var $linkToCurrent = $('a').addId('songza'),
      	  $add = $('div')
      		 .css('padding-left', '5px')
      		 .addClass('miniplayer-info-playlist-title')
      		 .text('Open Current')
      		 .append($linkToCurrent),
          $downloadLink = $('a').addId('download'),
          $download = $('div')
                      .css('padding-left', '5px')
                      .addClass('miniplayer-info-playlist-title')
                      .text('Open All')
                      .append($donwloadLink);
      $(".miniplayer-info-playlist").append($addString);
      $(".miniplayer-info-playlist").append($downloadString);
      
      // reset the trackURL back to it's original value
      //BIG NO NO!!
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

  function addHandlers() {
    $("#download").click(function() {
      open(trackURL);
      focus();
    });

    $("#songza").click(function(){
      open("spotify:track:" + currentSong["uri"]);
    });
  }
});
