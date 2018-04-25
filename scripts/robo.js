var DIRECTION = DIRECTION || {};

DIRECTION.LEFT = {};
DIRECTION.RIGHT = {};
DIRECTION.UP = {};
DIRECTION.DOWN = {};

function Robo(startPos,direction)
{
	this.pos = startPos;
	this.direction = direction || DIRECTION.RIGHT;
};

Robo.prototype.execute = function(cmd)
{
	if(cmd == COMMANDS.turnLeft)
	{
		this.turnLeft();
	}
	else if(cmd == COMMANDS.turnRight)
	{
		this.turnRight();
	}
	else if(cmd == COMMANDS.move)
	{
		this.move();
	}
};

Robo.prototype.move = function(){

	if(this.direction == DIRECTION.LEFT)
	{
		this.pos.x--;
	}
	else if(this.direction == DIRECTION.RIGHT)
	{		
		this.pos.x++;
	}
	else if(this.direction == DIRECTION.UP)
	{
		this.pos.y--;
	}
	else if(this.direction == DIRECTION.DOWN)
	{
		this.pos.y++;
	}	

};
Robo.prototype.turnLeft = function(){

	if(this.direction == DIRECTION.LEFT)
	{
		this.direction = DIRECTION.DOWN;
	}
	else if(this.direction == DIRECTION.RIGHT)
	{		
		this.direction = DIRECTION.UP;
	}
	else if(this.direction == DIRECTION.UP)
	{
		this.direction = DIRECTION.LEFT;
	}
	else if(this.direction == DIRECTION.DOWN)
	{
		this.direction = DIRECTION.RIGHT;
	}
};
Robo.prototype.turnRight = function(){

	if(this.direction == DIRECTION.LEFT)
	{
		this.direction = DIRECTION.UP;
	}
	else if(this.direction == DIRECTION.RIGHT)
	{		
		this.direction = DIRECTION.DOWN;
	}
	else if(this.direction == DIRECTION.UP)
	{
		this.direction = DIRECTION.RIGHT;
	}
	else if(this.direction == DIRECTION.DOWN)
	{
		this.direction = DIRECTION.LEFT;
	}
};


