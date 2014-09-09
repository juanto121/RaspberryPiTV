
video_slider.init = function(){
	
}
video_slider.getCurrentSlide=function(){
	return $('.selected_video');
}

video_slider.getNextSlide = function(current_slide){
	var current_slide_id = $(current_slide).attr("slide-id");
	var next_slide_id 	 = parseInt(current_slide_id) + 1;
	//Call for more videos() if nex_slide_id > total slides.
	return $('ul').find("[slide-id='"+next_slide_id+"']");
}

video_slider.nextSlide = function(){
	var current_slide = video_slider.getCurrentSlide();
	current_slide.removeClass('selected_video');
	var next_slide = video_slider.getNextSlide(current_slide);
	next_slide.addClass('selected_video');
}

var slider_touchable = new Hammer(document.getElementById('slider'));
slider_touchable.on("swipeleft",function(ev){
	video_slider.nextSlide();
});
slider_pan = new Hammer(document.getElementById('slider'));
slider_pan.on("pan",function(ev){
	//var slider_holder = $('slider');
	console.log(ev.deltaX);
	$('#slider').css("left",ev.deltaX);
});