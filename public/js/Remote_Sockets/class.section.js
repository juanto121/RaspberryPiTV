var Section = (function(){
	function Section(obj){
		this.createVariables(obj);
		this.createEvents(obj);
	}
	var s = SocketInteract.prototype;
	socki.createVariables = function(obj){
		this.socket_room = obj.room;
		this.socket_query_room = obj.query_room;
		this.socket_result_room = obj.res_room;
		this.result_handler = obj.result_handler;
		this.socket = io('/'+this.socket_room);
	}
	socki.createEvents = function(){
		this.socket.on(this.socket_result_room,this.result_handler({res_obj:response,room:this.room}));
	}
	socki.query = function(query){
		this.socket.emit(this.socket_room,query);
	}
	
	return SocketInteract;
})();