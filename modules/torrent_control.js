pirateBay = require('thepiratebay');

exports.respond = function(torrent,socket_io){
	socket_io.on('torrent_query',function(torrent_query){
			var resultado = youtube.getVideo(torrent_query.title);
			socket_io.emit('youtube_result',response);
	});
}