var setSong = function(songNumber) {
  if (currentSoundFile) {
           currentSoundFile.stop();
       }

  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber -1];
  // #1
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
      // #2
      formats: [ 'mp3' ],
      preload: true
  });

  setVolume(currentVolume);
};

var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }

 $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);
        }

        updateSeekPercentage($(this), seekBarFillRatio);
    });

    $seekBars.find('.thumb').mousedown(function(event) {

        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;

            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            } else {
                setVolume(seekBarFillRatio);
            }

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });




var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};


var createSongRow = function(songNumber, songName, songLength) {
   console.log("adding the song template");
     var template =
      '<tr class="album-view-song-item">'
      '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      '  <td class="song-item-title">' + songName + '</td>'
      '  <td class="song-item-duration">' + songLength + '</td>'
      '</tr>'
  };

var $row = $(template);

var clickHandler = function() {
     var songNumber = parseInt($(this).attr('data-song-number'));

   if (currentlyPlayingSongNumber !== null) {
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
    if (currentlyPlayingSongNumber !== songNumber) {
        // Switch from Play -> Pause button to indicate new song is playing.
         setSong(songNumber);
         currentSoundFile.play();
         $(this).html(pauseButtonTemplate);
         currentlyPlayingSongNumber = songNumber;
         currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

         var $volumeFill = $('.volume .fill');
+        var $volumeThumb = $('.volume .thumb');
+        $volumeFill.width(currentVolume + '%');
+        $volumeThumb.css({left: currentVolume + '%'});


             updatePlayerBarSong();
     } else if (currentlyPlayingSongNumber === songNumber) {
       if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();

/////////ASSIGNMENT 33/////
            } else {
              $(this).html(playButtonTemplate);
              $('.main-controls .play-pause .setTotalTimePlayerBar').html(playerBarPlayButton);
              currentSoundFile.play();
            }
        }
};

//ASSIGNMENT 32//
var playAndPause = function() {
  $('.main-controls .play-pause')
};

var canPlayAndPause = togglePlayFromPlayerBar() {
  if (currentlyPlayingSongNumber !== null) {
     var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
     currentlyPlayingCell.html(currentlyPlayingSongNumber);
   }
   if (currentlyPlayingSongNumber !== songNumber) {
       // Switch from Play -> Pause button to indicate new song is playing.
        setSong(songNumber);
        currentSoundFile.play();
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber === songNumber) {
      if (currentSoundFile.isPaused()) {
               $(this).html(pauseButtonTemplate);
               $('.main-controls .play-pause').html(playerBarPauseButton);
               currentSoundFile.play();
           } else {
               $(this).html(playButtonTemplate);
               $('.main-controls .play-pause').html(playerBarPlayButton);
               currentSoundFile.pause();
           }
         }
       };

       ///// ASSIGNMENT 32////




var onHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
     }
 };

 var offHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
     }
     console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
 };




      $row.find('.song-item-number').click(clickHandler);
      $row.hover(onHover, offHover);
      return $row;
 };

  // #1

//var trackIndex = function(album, song) {
  //   return album.songs.indexOf(song);
 //};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
//DIDNT KNOW WHERE TO ADD THESE
    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var nextSong = function() {
   var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
   // Note that we're _incrementing_ the song here
   currentSongIndex++;

   if (currentSongIndex >= currentAlbum.songs.length) {
       currentSongIndex = 0;
   }

   // Save the last song number before changing it
var lastSongNumber = currentlyPlayingSongNumber;

   // Set a new current song
   currentlyPlayingSongNumber = currentSongIndex + 1;
   currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

   // Update the Player Bar information
   updatePlayerBarSong();

var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

// DIDNT KNOW WHERE TO ADD THESE
   setSong(currentSongIndex + 1);
   currentSoundFile.play();

   $nextSongNumberCell.html(pauseButtonTemplate);
   $lastSongNumberCell.html(lastSongNumber);
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
  };

var updateSeekBarWhileSongPlays = function() {
       if (currentSoundFile) {
           // #10
           currentSoundFile.bind('timeupdate', function(event) {
               // #11
               var seekBarFillRatio = this.getTime() / this.getDuration();
               var $seekBar = $('.seek-control .seek-bar');

               updateSeekPercentage($seekBar, seekBarFillRatio);

            ///////ASSIGNMENT 33///////
               setCurrentTimeInPlayerBar($currentTime);
           });
       }
   };


var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
      var offsetXPercent = seekBarFillRatio * 100;
      // #1
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(100, offsetXPercent);

      // #2
      var percentageString = offsetXPercent + '%';
      $seekBar.find('.fill').width(percentageString);
      $seekBar.find('.thumb').css({left: percentageString});
   };

var setupSeekBars = function() {
     //6
     var $seekBars = $('.player-bar .seek-bar');

     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;

         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
     });

     $seekBars.find('.thumb').mousedown(function(event) {
              // #8
              var $seekBar = $(this).parent();

              // #9
              $(document).bind('mousemove.thumb', function(event){
                  var offsetX = event.pageX - $seekBar.offset().left;
                  var barWidth = $seekBar.width();
                  var seekBarFillRatio = offsetX / barWidth;

                  updateSeekPercentage($seekBar, seekBarFillRatio);
              });

              // #10
              $(document).bind('mouseup.thumb', function() {
                  $(document).unbind('mousemove.thumb');
                  $(document).unbind('mouseup.thumb');
              });
          });
 };





  var trackIndex = function(album, song) {
       return album.songs.indexOf(song);
   };


var updatePlayerBarSong = function() {
   $('.currently-playing .song-name').text(currentSongFromAlbum.title);
   $('.currently-playing .artist-name').text(currentAlbum.artist);
   $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
   $('.main-controls .play-pause').html(playerBarPauseButton);
    };



//ASSIGNMENT 33//
var setCurrentTimeInPlayerBar = function(currentTime) {
    $('.current-time').text(currentTime.song)
    };

setTotalTimePlayerBar = function(totalTime) {
    var $totalTime = $('.songLength');
};



/////ASSIGNMENT 33 NEED HELP//////
var filterTimeCode = function (timeInSeconds) {
  parseFloat()
};



//var setCurrentAlbum = function(album) {
     // #2
 //$albumTitle.text(album.title);
 //$albumArtist.text(album.artist);
 //$albumReleaseInfo.text(album.year + ' ' + album.label);
 //$albumImage.attr('src', album.albumArtUrl);

    // #3
    //$albumSongList.empty();
    // #4
    //for (var i = 0; i < album.songs.length; i++) {
      //console.log("create song row");
    //  var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    //  $albumSongList.append($newRow);
    //}
//};

// Album button templates

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
 // #1
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSoundFile = null;
 var currentVolume = 80;
 var currentSongFromAlbum = null;


 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');




 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     setupSeekBars();
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
          //ASSINGMENT 32//
     $playAndPause.click(togglePlayFromPlayerBar());
  });
