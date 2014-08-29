var youtubeAPI = require("youtube-api");



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


exports.respond = function(youtube,socket_io){
console.log('out youtube-search');
	socket_io.on('youtube_query',function(yt_query){
    youtube_query = yt_query.title;
    console.log('in youtube-search:'+ youtube_query);



      var auto=youtubeAPI.authenticate({
          type: "key"
        , key:"AIzaSyAhCfiK8MXp5fshlJm72o_regYp6uwrVq0"
      });
      console.log(auto);
			var resultado = youtubeAPI.search.list({
        q: youtube_query,
        part: 'snippet'
      }, function(err, response){
        console.log(response || err);
        socket_io.emit('youtube_result',response);
      });
			
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
/*
Youtube.channels.list({
    "part": "id"
  , "mySubscribers": true
  , "maxResults": 50
}, function (err, data) {
    console.log(err || data);
});
*/