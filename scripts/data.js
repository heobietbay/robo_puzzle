var COMMANDS = COMMANDS || {};

COMMANDS.turnLeft = { name :"TurnLeft" };
COMMANDS.turnRight = { name :"TurnRight" };
COMMANDS.move = { name :"Move" };
COMMANDS.f1 = { name :"F1" };
COMMANDS.f2 = { name :"F2" };

var MATRIX = [[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
              [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
              [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
              [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
              [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
              [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
              [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
              [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]];


var STARS_LOCATION = [{x:3,y:2},{x:1,y:3},{x:5,y:4}];
