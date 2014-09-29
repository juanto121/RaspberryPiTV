$(function(){
	var socket_youtube = io.connect('/youtube');
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
		video_slider.changeVideoInformation(video_slider.getCurrentSlide());
	});
});


/*
socket_youtube.on('youtube_result',function(youtube_response){
		socket_youtube.on('youtube_result',function(youtube_response){
		var found_content = youtube_response;
        var i=0;
        var lenght_content= found_content.items.length; 
		for(i;i<lenght_content;i++)
		{
			var video_entry= found_content.items[i];
			var title= video_entry.snippet.title;
			var thumbnail= video_entry.snippet.thumbnails.high.url;
			var idVideo= video_entry.id.videoId;
			
			var video_tile = {
				title: title,
				thumbnail: thumbnail,
				idVideo: idVideo
			};

			var template = $('#youtubeTpl').html();
			var	html = Mustache.to_html(template, video_tile);

			$('ul.video-tile').append(html);
		}
	});

	var socket = io('/torrent');
	socket.on('torrent_result', function(torrent_response){
		var found_content = torrent_response;
		var index;
		var content_length = found_content.length;
		for(index = 0; index < content_length; ++index){
			torrent_entry = found_content[index];
			var name = torrent_entry.name,
				link = torrent_entry.link,
				size = torrent_entry.size;

			torrent_info = {
				name : name,
				link : link,
				size : size,
			};

			var template = $('#torrentTpl').html(),
				html = Mustache.to_html(template, torrent_info);

			$('ul.torrent-info').append(html);
		}
	});
*/