// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 // 4th Album (assignment 24)
 var albumKmills = {
     title: 'Self Made',
     artist: 'K MILLS',
     label: 'Akata',
     year: '2018',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Maddox', duration: '8:26' },
         { title: 'Lincoln', duration: '10:44' },
         { title: 'Benny', duration: '12:00'},
         { title: 'Ndurache', duration: '4:03' },
         { title: 'Fab4', duration: '4:44'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
   console.log("adding the song template");
     var template =
      '<tr class="album-view-song-item">'
    +  '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    +  '  <td class="song-item-title">' + songName + '</td>'
    +  '  <td class="song-item-duration">' + songLength + '</td>'
    +  '</tr>'
     ;

     return $(template);
  };

  // #1
var setCurrentAlbum = function(album) {
    var $albumArtist = $(.'album-view-artist');
    var $albumReleaseInfo = $(.'album-view-release-info');
    var $albumImage = $(.'album-cover-art');
    var $albumSongList = $(.'album-view-song-list');


//var setCurrentAlbum = function(album) {
     // #2
 $albumTitle.text(album.title);
 $albumArtist.text(album.artist);
 $albumReleaseInfo.text(album.year + ' ' + album.label);
 $albumImage.attr('src', album.albumArtUrl);

    // #3
    $albumSongList.empty();
    // #4
    for (var i = 0; i < album.songs.length; i++) {
      //console.log("create song row");
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);  
    }
};
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);


var findParentByClassName = function(element, targetClass) {
  if (element) {
    var currentParent = element.parentElement;
    while (currentParent.className !== targetClass && currentParent.className !== null) {
        currentParent = currentParent.parentElement;
    }
    return currentParent;
    //if (element.parentElement && element.parentElement.className) {
    if (element.parentElement === null) {
        console.log("No parent found");
    } else if (element.parentElement.className !== targetClass) {
        console.log("No parent found with that class name.");
    }
  }


};


var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function(targetElement) {

    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');

    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
           songItem.innerHTML = playButtonTemplate;
           currentlyPlayingSong = null;

    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
              var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
              currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
              songItem.innerHTML = pauseButtonTemplate;
              currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }

};

// Elements to which we'll be adding listeners
songListContainer.addEventListener('mouseover', function(event) {
      // Only target individual song rows during event delegation
          if (event.target.parentElement.className === 'album-view-song-item') {
          event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
          var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
           }
      }
  });


for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {

              // #1
               var songItem = getSongItem(event.target);
               var songItemNumber = songItem.getAttribute('data-song-number');

               // #2
               if (songItemNumber !== currentlyPlayingSong) {
                   songItem.innerHTML = songItemNumber;
               }
        });




        songRows[i].addEventListener('click', function(event) {

              clickHandler(event.target);
         });
     }

}



// var ablums = [albumPicasso, albumMarconi, albumKmills];
// var index = 1;
// albumImage.addEventListener("click", function(event) {
//     setCurrentAlbum(albums[index]);
//     index++;
//     if (index == albums.length) {
//        index - 0;
//     }
//   });
// };
