var Remote = (function(){
	function Remote(){
		this.createVariables();
		this.createEvents();
	}

	var remote = Remote.prototype;

	remote.createVariables = function(){

		this.play_btn = $('#play_btn');
		this.download_btn = $('#download_btn');
		this.tablet = new Hammer($('#tablet')[0]);
		this.ytube_search = $('#ytube_search input');
		this.torrent_search = $('#torrent_search input');
		this.button_next_section = $('#btn_next_section');

		var slider_element = $('#slider');
		var current_slide = $('.selected_video');
		var video_info = $('#video_information');
		var thumbnail_description = $('.thumbnail_description')
		var slider_pan_hammer = new Hammer(slider_element[0]);

		this.slider = new VideoSlider({ slider:slider_element,
										default_slide:current_slide,
										selected_class:'selected_video',
										slider_pan:slider_pan_hammer,
										vid_info:video_info,
										description_class:'thumbnail_description'
									});


		

		this.sections = new Section({button_next:this.button_next_section});

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

		this.yt_template = $('#youtubeTpl');
		this.torrent_template = $('#torrentTpl');
	}

	remote.createEvents = function(){
		this.tablet.on("swipeleft",this.changeSection.bind(this));
		this.ytube_search.change(function(){
			this.yt_socket.query({title:this.ytube_search.val()});
		}.bind(this));
		this.torrent_search.change(function(){
			this.torrent_socket.query({title:this.torrent_search.val()});
		}.bind(this));
		this.play_btn.on("click",this.play.bind(this));
		this.download_btn.on("click",this.download.bind(this));
	}
	

	remote.handleResponse = function(response){
		if(response.room === 'youtube'){
			var content = response.res_obj;
			var length = content.items.length;
			var i = 0;
			this.slider.slider_element.empty();
			while(i < length){
				var video_entry= content.items[i];
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
					Mustache.to_html(this.yt_template.html(), video_tile);

				this.slider.slider_element.append(tile_html);
				var current_video = $('#'+idVideo);
				if(i === 0){
					current_video.addClass("selected_video");
				}
				i++
			//	current_video.on("click",this.select.bind(this));
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

	remote.download = function(event){
		console.log(this.slider.current_slide[0].id);
	}

	remote.changeSection = function(){
		console.log("cahnge");
		this.sections.nextSection();
	}

	return Remote;

})();

window.onload = function(){
	Remote = new Remote();
}