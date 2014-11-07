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

  socket_io.on('download',function(data){
    console.log("Trying to download...");
    var id = data.video_id,
        url = "http://www.youtube.com/watch?v="+id;
        os.run('youtube-dl',['-o','./vid/%(id)s.%(ext)s','-f','/18/22',url],
        function (me, buffer) {
            me.stdout = buffer.toString();
            //socket.emit("loading",{output: me.stdout});
            console.log(me.stdout);
         },
        function () {
            //child = spawn('omxplayer',[id+'.mp4']);
            //omx.start('vid/'+id+'.mp4');
            console.log("omxplayer started");
        });
  });

}
