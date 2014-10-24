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

				var tile_html = 
					Mustache.to_html(this.yt_template.html, video_tile);

				this.slider.append(tile_html);
				var current_video = $('#'+idVideo);
				if(lenght === 0){
					current_video.addClass("selected_video");
				}
				current_video.on("click",this.play.bind(this));
			}
			this.slider.update();

		}


		if(response.room === 'torrent'){
			torrent_entry = found_content[index];
			var name = torrent_entry.name,
				link = torrent_entry.link,
				seeders = torrent_entry.seeders,
				size = torrent_entry.size;

				var G=(255*seeders)/100,
					R=(255*(100-seeders))/100,
					B=20;

			torrent_info = {
				name : name,
				number:index,
				seeders:seeders,
				link : link,
				size : size,
			};

			var template = $('#torrentTpl').html(),
				html = Mustache.to_html(template, torrent_info);

			$('#slider').append(html);

			var current_li = $('#torrent_'+index);
			current_li.on("click",this.play.bind(this));
			var colors = 'rgb('+Math.round(R)+','+Math.round(G)+','+B+')';
			$(current_li).css('background-color',colors);
			if( index == 0 ){
				current_li.addClass("selected_video");
			}
		}

	}

	remote.play = function(event){
		
	}

	remote.changeSection = function(){

	}

	return Remote;

})();

window.onload = function(){
	Remote = new Remote();
}