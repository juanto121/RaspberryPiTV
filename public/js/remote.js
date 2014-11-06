$(function(){
	remote.init();
	

	var tab = document.getElementById('tablet');
	var tablet = new Hammer(tab);
	
	var socket = io('/torrent');
	$(".search-bar input").change(function() {
		socket.emit('torrent_query',{title:$(this).val()});
 	});
	socket.on('torrent_result', function(torrent_response){
		var found_content = torrent_response;
		var index;
			
			$('#slider').empty();
		var content_length = found_content.length;
		
		for(index = 0; index < 10; ++index){
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
			var colors = 'rgb('+Math.round(R)+','+Math.round(G)+','+B+')';
			$(current_li).css('background-color',colors);
			if( index == 0 ){
				current_li.addClass("selected_video");
			}

		}

	
    	$('#slider').css("left",0);
			
		var slider_element = $('#slider');
		var current_slide = $('.selected_video');
		var video_info = $('#video_information');
		var thumbnail_description = $('.thumbnail_description')
		var slider_pan_hammer = new Hammer(slider_element[0]);
		var sliderClass = new VideoSlider( {slider:slider_element,
											default_slide_id:0,
											default_slide:current_slide,
											selected_class:'selected_video',
											slider_pan:slider_pan_hammer,
											vid_info:video_info,
											description_class:'thumbnail_description'
											} );
		sliderClass.changeVideoInfo();

	});

	var socket_youtube = io.connect('/youtube');
	

	$(".search-bar2 input").change(function() {
		socket_youtube.emit('youtube_query',{title:$(this).val()});
 	});

	socket_youtube.on('youtube_result',function(youtube_response){
		var found_content = youtube_response;
        var i=0;
        var lenght_content= found_content.items.length; 
        $('#slider').empty();
		for(i;i<lenght_content;i++)
		{
			var video_entry= found_content.items[i];
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

			var template = $('#youtubeTpl').html(),
				html = Mustache.to_html(template, video_tile);

			$('#slider').append(html);

			if( i == 0 ){
				$('#'+idVideo).addClass("selected_video");
			}
		}

		var slider_element = $('#slider');
		var current_slide = $('.selected_video');
		var video_info = $('#video_information');
		var thumbnail_description = $('.thumbnail_description')
		var slider_pan_hammer = new Hammer(slider_element[0]);
		var sliderClass = new VideoSlider( {slider:slider_element,
											default_slide_id:0,
											default_slide:current_slide,
											selected_class:'selected_video',
											slider_pan:slider_pan_hammer,
											vid_info:video_info,
											description_class:'thumbnail_description'
											} );
		sliderClass.changeVideoInfo();
	});

	tablet.on("swipeleft",function(ev){
		return remote.nextTab();
	});



});

