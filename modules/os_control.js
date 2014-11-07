spawn = require('child_process').spawn;

exports.run = function(command, arguments, callback, end){
	
	var child = spawn(command, arguments);
	child.stdout.on('data', function(buffer){
		callback(this, buffer);
	});
	child.stdout.on('end', end);	
	console.log('controlling os');

}
