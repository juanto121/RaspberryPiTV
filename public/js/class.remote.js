var Remote = (function(){
	function Remote(){
		this.createVariables();
		this.createEvents();
	}

	var remote = Remote.prototype;

	remote.createVariables = function(){
		this.sections;

		this.slider;

		this.tablet = new Hammer($('#tablet'));
		this.ytube_search = $('#ytube_search');
		this.torrrent_search = $('#torrent_search');

		this.yt_socket = new SocketInteract({
			socket_room:'youtube',
			socket_query_room:'youtube_query',
			socket_result_room:'youtube_result',
			result_handle:this.handleResponse.bind(this)
		});
		this.torrent_socket = new SocketInteract({
			socket_room:'torrent',
			socket_query_room:'torrent_query',
			socket_result_room:'torrent_result',
			result_handle:this.handleResponse.bind(this)
		});
	}

	remote.createEvents = function(){
		this.tablet.on("swipeleft",this.changeSection.bind(this));
		this.ytube_search.change(this.yt_socket.query({title:this.ytube_search.val()}));
		this.torrent_search.change(this.torrent_socket.query({title:this.torrent_search.val()}));
	}

	remote.handleResponse = function(response){
		/*
			TODO:
			Asignar a template que corresponda.
			Limpiar y actualizar Slider con nueva info.
			suscribir clic en c/<li>,play.
		*/
	}

	remote.play = function(video_id){

	}

	remote.changeSection = function(){

	}

	return Remote;

})();

window.onload = function(){
	Remote = new Remote();
}