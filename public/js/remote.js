remote.currentSection = 0;
remote.totalSections  = function(){
	return remote.sections.length;
}

remote.sections = [
	{
		id_section : 0
	},

	{
		id_section : 1
	}
];

remote.loadSection = function(){
	var section = remote.sections[remote.currentSection];
	$(remote.getSection(remote.currentSection)).show();
}

remote.getSection = function(id){
	return $('.section[data-section='+id+']');
}

remote.init = function(){
	return remote.loadSection();
}

remote.nextTab = function(){
	var nextSection, pageWidth, section;
	nextSection = (remote.currentSection + 1)%2;
	pageWidth = $(window).width();
	slideInNext = function(){
		var followingSection;
		followingSection = remote.getSection(nextSection);
		$(followingSection).css({left:pageWidth}).show();
		remote.currentSection = nextSection;
		return $(followingSection).animate({
			left : 0
		}, 300,function(){
			//Section Slide Success
		});
	};
	section = remote.getSection(remote.currentSection);
	return $(section).animate({
		left: 0-pageWidth
	}, 300,function(){
		$(this).hide();
		return slideInNext();
	});
}

$(function(){
	remote.init();
	video_slider.init();
	var tab = document.getElementById('tablet');
	var tablet = new Hammer(tab);
	
	var socket = io('/torrent');
	$(".search-bar input").change(function() {
		socket.emit('torrent_query',{title:$(this).val()});
 	});
	socket.on('torrent_result', function(torrent_response){
		var found_content = torrent_response;
		var index;
		$('ul.torrent-info').empty();
        $('#slider').css("left",0);
		var content_length = found_content.length;
		
		for(index = 0; index < 5; ++index){
			torrent_entry = found_content[index];
			var name = torrent_entry.name,
				link = torrent_entry.link,
				seeders = torrent_entry.seeders,
				size = torrent_entry.size;

				var G=(255*seeders)/100,
					R=(255*(100-seeders))/100,
					B=0;

			torrent_info = {
				name : name,
				number:index,
				seeders:seeders,
				link : link,
				size : size,
			};

			var template = $('#torrentTpl').html(),
				html = Mustache.to_html(template, torrent_info);

			$('ul.torrent-info').append(html);
			var current_li = $('#torrent_'+index);
			var colors = 'rgb('+Math.round(R)+','+Math.round(G)+','+B+')';
			$(current_li).css('background-color',colors);
			if( index == 0 ){
				current_li.addClass("selected_video");
			}
		}
		video_slider.changeVideoInformation(video_slider.getCurrentSlide());

	});

	socket_youtube = io('/youtube');
	
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
		video_slider.changeVideoInformation(video_slider.getCurrentSlide());
	});

	tablet.on("swipeleft",function(ev){
		return remote.nextTab();
	});

});

