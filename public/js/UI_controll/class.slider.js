var VideoSlider = (function(){
	function VideoSlider(obj){
		this.createVariables(obj);
		this.createEvents();
	}
	var vid_slider = VideoSlider.prototype;
	vid_slider.createVariables = function(obj){
		this.slider_element = obj.slider;
		this.current_slide_id = obj.default_slide_id;
		this.current_slide = obj.default_slide;
		this.selected_class = obj.selected_class;
		this.slider_pan = obj.slider_pan;
	}
	vid_slider.createEvents = function(){
	//	this.slider_pan.on("pan",this.move.bind(this));
	}
	vid_slider.move = function(ev){
		var direction = ev.direction;
		var deltax = 0;
		var displacement = ev.distance;
		console.log(displacement);
		if(direction == Hammer.DIRECTION_LEFT)
			{deltax = -2;}
		if(direction == Hammer.DIRECTION_RIGHT)
			{deltax = 2;}
		if(ev.isFinal){
			if( Math.round(displacement)>60){
				var id= this.nextSlide(1);
			}
		}
		this.slider_element.css("left","+="+deltax);
	}
	vid_slider.nextSlide = function(direction){
		this.current_slide.removeClass(this.selected_class);
		var next_slide_id = this.current_slide_id + direction;
		var next_slide = this.slider_element.find("[slide-id='"+next_slide_id+"']");
		next_slide.addClass(this.selected_class);
	}
	return VideoSlider;
})();