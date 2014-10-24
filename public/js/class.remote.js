var Remote = (function(){
	function Remote(){
		this.createVariables();
		this.createEvents();
	}

	var remote = Remote.prototype;

	remote.createVariables = function(){
		this.sections;

		this.slider;

		this.tablet = new Hammer($('#tablet'));
		this.ytube_search = $('#ytube_search');
		this.torrrent_search = $('#torrent_search');

		this.yt_socket = new SocketInteract({
			socket_room:'youtube',
			socket_query_room:'youtube_query',
			socket_result_room:'youtube_result',
			result_handle:this.handleResponse.bind(this)
		});
		this.torrent_socket = new SocketInteract({
			socket_room:'torrent',
			socket_query_room:'torrent_query',
			socket_result_room:'torrent_result',
			result_handle:this.handleResponse.bind(this)
		});

		this.yt_template = $('youtubeTpl');
		this.torrent_template = $('torrentTpl');
	}

	remote.createEvents = function(){
		this.tablet.on("swipeleft",this.changeSection.bind(this));
		this.ytube_search.change(this.yt_socket.query({title:this.ytube_search.val()}));
		this.torrent_search.change(this.torrent_socket.query({title:this.torrent_search.val()}));
	}

	remote.handleResponse = function(response){
		if(response.room === 'youtube'){
			var content = response.res_obj;
			var lenght = content.lenght;
			while(lenght--){
				var video_entry= content.items[lenght];
				var title= video_entry.snippet.title;
				var thumbnail= video_entry.snippet.thumbnails.medium.url;
				var idVideo= video_entry.id.videoId;
				var video_description = video_entry.snippet.description;
				var channel_title = video_entry.snippet.channelTitle;
				var published_time = video_entry.snippet.publishedAt;

				var video_tile = {
					number: i,
					title: title,
					thumbnail: thumbnail,
					idVideo: idVideo,
					description:video_description,
					channelTitle: channel_title,
					publishedAt: published_time
				};
			}
		}


		if(response.room === 'torrent'){

		}

		/*
			TODO:
			Asignar a template que corresponda.
			Limpiar y actualizar Slider con nueva info.
			suscribir clic en c/<li>,play.
		*/
	}

	remote.play = function(video_id){

	}

	remote.changeSection = function(){

	}

	return Remote;

})();

window.onload = function(){
	Remote = new Remote();
}