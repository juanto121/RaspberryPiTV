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

remote.next = function(){
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
			console.log('slidein_nextSection');
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
	var tab = document.getElementById('tablet');
	var tablet = new Hammer(tab);
	var socket = io('/torrent');
	$(".search-bar input").change(function() {
		socket.emit('torrent_query',{title:$(this).val()});
 	});
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
	tablet.on("swipeleft",function(ev){
		return remote.next();
	});
});