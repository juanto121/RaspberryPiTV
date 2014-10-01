var Movement = function(){};
Movement.prototype.execute = function(){};

var MovementStrategy = function(){};
MovementStrategy.prototype = Object.create(Movement.prototype);
MovementStrategy.prototype.execute = function(){
	return this.move();
};
MovementStrategy.prototype.move = function(){
 	console.log("Default movement strat.");
};


var Mover = function(strategy){
	this.strategy = strategy;
};
Mover.prototype.move = function(){
	return this.strategy.execute();
}


var SimplePanner = function(){};
SimplePanner.prototype = Object.create(MovementStrategy.prototype);
SimplePanner.prototype.move = function(){
	
};

var simple_pan = new Mover(new SimplePanner());
simple_pan.move();
