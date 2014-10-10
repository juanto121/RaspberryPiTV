pirateBay = require('thepiratebay');
os = require('./os_control');

exports.respond = function(torrent,socket_io){
	socket_io.on('torrent_query',function(torrent_query){
			pirateBay.search(torrent_query.title,{page:'1', orderBy: '7' },function(error,response){
				socket_io.emit('torrent_result',response);
				console.log(os.run());
			});	
	});


}


