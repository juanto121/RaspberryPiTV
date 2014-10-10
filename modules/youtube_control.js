var youtubeAPI = require("youtube-api");
os = require('./os_control');

exports.respond = function(youtube,socket_io){

	socket_io.on('youtube_query',function(yt_query){
    youtube_query = yt_query.title;

      var auto=youtubeAPI.authenticate({
          type: "key"
        , key:"AIzaSyAhCfiK8MXp5fshlJm72o_regYp6uwrVq0"
      });

			var resultado = youtubeAPI.search.list({
        q: youtube_query,
        maxResults: 10,
        part: 'snippet',
        type:'video'
      }, function(err, response){
        if(response){
          socket_io.emit('youtube_result',response);
          socket_io.broadcast.emit('youtube_result',response);
        }else{
          console.log(err);
        }
      });
			
	});
}
