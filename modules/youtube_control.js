var youtubeAPI = requiere("youtube-api");

Youtube.authenticate({
    type: "key"
  , token: "AIzaSyDeGcO6S-VQP5r1gYuACGelrP5B5dvFva0"
});

/**
Youtube.authenticate({
    type: "jwt"
  , email: "77....3vv@developer.gserviceaccount.com"
  , keyFile: "... auth.pem"
  , key: "fb....d50"
  , subject: "you@gmail.com" // optional
  , scopes: ["https://www.googleapis.com/auth/youtube"]
}).authorize(function (err, data) {
    if (err) { throw err; }
    // Access resources 
});
*/


exports.respond = function("youtube",socket_io){
	socket_io.on('youtube-query',function(youtube_query){
			var resultado = youtube.getVideo(torrent_query.title);
			socket_io.emit('youtube_result',response);
	});
}

/** Busquedas por palabras claves.

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}


*/ 

/** Visualizacion de Resultados de Busqueda (JQUERY)


<!doctype html>
<html>
  <head>
    <title>Search</title>
  </head>
  <body>
    <div id="buttons">
      <label> <input id="query" value='cats' type="text"/><button id="search-button" disabled onclick="search()">Search</button></label>
    </div>
    <div id="search-container">
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="auth.js"></script>
    <script src="search.js"></script>
    <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
  </body>
</html>


*/

Youtube.channels.list({
    "part": "id"
  , "mySubscribers": true
  , "maxResults": 50
}, function (err, data) {
    console.log(err || data);
});