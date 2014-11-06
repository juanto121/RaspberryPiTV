var Section = (function(){
	function Section(obj){
		this.createVariables(obj);
		this.createEvents();
	}
	var section = Section.prototype;
	section.createVariables = function(obj){
		this.current_section = 0;
		this.num_sections = 2;
		this.section_element = obj.section_element;
		this.button_next = obj.button_next;
		this.loadSections();
	}
	section.getSection = function(id){
		return $('.section[data-section='+id+']');
	}

	section.loadSection = function(){
		$(this.getSection(this.current_section)).show();
	}	

	section.nextSection = function(){
		var next_section , page_width, section;
		next_section = (this.current_section + 1) % this.num_sections;
		page_width = $(window).width();
		slideInNext = function(){
			var following_section;
			following_section = this.getSection(next_section);
			$(following_section).css({left:page_width}).show();
			this.current_section = next_section;
			return $(following_section).animate({left:0},300,function(){});
		};
		return $(section).animate({left:0-page_width},300,
			function(){
				this.section_element.hide();
				return slideInNext();
			})
	}

	section.createEvents = function(){
		this.button_next.on("click",this.next_section.bind(this));
	}
	return Section;
})();