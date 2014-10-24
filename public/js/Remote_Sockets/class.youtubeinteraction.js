var YtSocket = (function(){


	var socket_youtube = io.connect('/youtube');
	

	$(".search-bar2 input").change(function() {
		socket_youtube.emit('youtube_query',{title:$(this).val()});
 	});

	socket_youtube.on('youtube_result',function(youtube_response){
		var found_content = youtube_response;
        var i=0;
        var lenght_content= found_content.items.length; 
        $('ul.video-tile').empty();
        $('#slider').css("left",0);
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

			$('ul.video-tile').append(html);

			if( i == 0 ){
				$('#'+idVideo).addClass("selected_video");
			}
		}

		var slider_element = $('#slider');
		var current_slide = $('.selected_video');
		var slider_pan_hammer = new Hammer(slider_element[0]);
		var sliderClass = new VideoSlider( {slider:slider_element,
											default_slide_id:0,
											default_slide:current_slide,
											selected_class:'.selected_video',
											slider_pan:slider_pan_hammer
											} );

		//video_slider.changeVideoInformation(video_slider.getCurrentSlide());
	});




})();


