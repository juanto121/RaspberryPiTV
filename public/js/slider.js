/*
video_slider.init = function(){

}

video_slider.getCurrentSlide=function(){
	return $('.selected_video');
}

video_slider.getCurrentSlideId=function(current_slide){
	var current_slide_id = $(current_slide).attr("slide-id");
	return parseInt(current_slide_id) ;
}



video_slider.getNextSlide = function(current_slide){
	var current_slide_id = $(current_slide).attr("slide-id");
	var next_slide_id 	 = parseInt(current_slide_id) + 1;
	//Call for more videos() if nex_slide_id > total slides.
	return $('ul').find("[slide-id='"+next_slide_id+"']");
}

video_slider.getPreviousSlide = function(current_slide){
	var current_slide_id = $(current_slide).attr("slide-id");
	var previous_slide_id 	 = parseInt(current_slide_id) -1;
	return $('ul').find("[slide-id='"+next_slide_id+"']");
}

video_slider.nextSlide = function(){

	var current_slide = video_slider.getCurrentSlide();
	current_slide.removeClass('selected_video');
	var next_slide = video_slider.getNextSlide(current_slide);
	next_slide.addClass('selected_video');
	this.changeVideoInformation(next_slide);
	return video_slider.getCurrentSlideId(next_slide);

}

video_slider.changeVideoInformation = function(current_slide){
	var current_section_id = remote.currentSection;
	var current_section=remote.getSection(current_section_id);
    var video_info = current_section.find('#video_information');
	video_info.empty();
	var hidden_info = ($(current_slide)).find('.hidden')[0];
	$(hidden_info).removeClass('hidden');
	video_info.append(hidden_info);
}

    

slider_pan = new Hammer(document.getElementById('slider'));
slider_pan.on("pan",function(ev){
	
	var direction = ev.direction;
	var deltax = 0;
	var displacement = ev.distance;
	//console.log(Math.round(displacement%100) > 98);
	console.log(displacement);
	if(direction == Hammer.DIRECTION_LEFT)
	{
		deltax = -2;
	}
	if(direction == Hammer.DIRECTION_RIGHT){
		deltax = 2;
	}
	
	if(ev.isFinal){

		if( Math.round(displacement)>60){
		var id= video_slider.nextSlide();
		//deltax=-120*(1+id);
	}

		//ver cuanto se alejo del principio (left)
		//o ver el current_slide y centrarlo, 
		//al multiplo de li.width, ie. li.width * current_slide
		//console.log( parseInt($('.selected_video').attr("slide-id")) * 100 );
	}
	$('#slider').css("left","+="+deltax);
});
*/