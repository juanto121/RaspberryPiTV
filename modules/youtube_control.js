var youtubeAPI = require("youtube-api");

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
        maxResults: 5,
        part: 'snippet',
        type:'video'
      }, function(err, response){
        console.log(response || err);
        socket_io.emit('youtube_result',response);
      });
			
	});
}
