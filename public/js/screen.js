$(function(){
	var socket_youtube = io('youtube');
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
	});
});