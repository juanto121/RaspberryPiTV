$(function(){
	 var date = new Date();
	 $('#date').html(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" - "+date.getHours()+":"+date.getMinutes());
	var socket_youtube = io.connect('/youtube');
socket_youtube.on('youtube_result',function(youtube_response){
		var found_content = youtube_response;
        var i=0;
        var lenght_content= found_content.items.length; 
        var selected_video;
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

			if( i == 2 ){
				selected_video = $('#'+idVideo).addClass("selected_video");
			}
		}
		$('#video_information').html('<h1>'+selected_video.find('p.hidden')[0].innerHTML+'</h1>')
	});
});