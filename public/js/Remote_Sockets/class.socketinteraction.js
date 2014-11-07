var SocketInteract = (function(){
	function SocketInteract(obj){
		this.createVariables(obj);
		this.createEvents(obj);
	}
	var socki = SocketInteract.prototype;
	socki.createVariables = function(obj){
		this.socket_room = obj.socket_room;
		this.socket_query_room = obj.socket_query_room;
		this.socket_result_room = obj.socket_result_room;
		this.result_handler = obj.result_handle;
		this.socket = io('/'+this.socket_room);
	}
	socki.createEvents = function(obj){
		this.socket.on(this.socket_result_room,function(response,result_handler){
			this.result_handler({res_obj:response,room:this.socket_room});
		}.bind(this));
	}
	socki.query = function(query){
		this.socket.emit(this.socket_query_room,query);
	}
	
	return SocketInteract;
})();


