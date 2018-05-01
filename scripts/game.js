        var TIMEOUT_30 = 30;
        var TIMEOUT_100 = 100;
        var TIMEOUT_200 = 200;
        var TIMEOUT_250 = 250;
        var TIMEOUT_1000 = 1000;

        window.onload = function() {
            boardManager.init();
            boardManager.drawStarList(starImg);
            boardManager.handleRobotMove(robo, roboImgs);
        };
        var roboImgs = {
            right: document.getElementById("robo"),
            left: document.getElementById("robo_l"),
            down: document.getElementById("robo_d"),
            up: document.getElementById("robo_u")
        };
        var robo = new Robo(startPos = ROBO_LOCATION);

        var starImg = document.getElementById("star");

        var mainBoard = document.getElementById('board');

        var boardManager = new BoardManager(mainBoard, MATRIX, STARS_LOCATION);
        // refresh every 30 mil sec
        var gameIntervalId = window.setInterval(() => window.requestAnimationFrame(function() {
            boardManager.clearCanvas();
            boardManager.init();
            boardManager.drawStarList(starImg);
            boardManager.handleRobotMove(robo, roboImgs);
        }), TIMEOUT_30);

        var checkIntervalId = window.setInterval(() => {
            if (boardManager.gameOver()) {
                window.clearInterval(gameIntervalId);
                window.clearInterval(checkIntervalId);
                alert("Game over ^^");
            }
        }, TIMEOUT_200);

        function makeRoboFindStar(aStarPos) {
            var path = pathFromStartToEnd(robo.pos, aStarPos);
            var allCmds = [];
            var cloneRobo = new Robo(robo.pos, robo.direction);
            path.forEach(function(point, idx) {
                allCmds = allCmds.concat(moveRoboToAdjacentPosition(cloneRobo, point));
                cloneRobo.pos = point;
            });
            console.dir(allCmds);
            return allCmds;
        }

        function makeRoboFindAllStars() {
            var allCmds = [];
            var cloneRobo = new Robo(robo.pos, robo.direction);
            STARS_LOCATION.forEach(function(aStarPos) {
                var path = pathFromStartToEnd(cloneRobo.pos, aStarPos);
                path.forEach(function(point, idx) {
                    allCmds = allCmds.concat(moveRoboToAdjacentPosition(cloneRobo, point));
                    cloneRobo.pos = point;
                });
            });
            executeCmdOnRobot(allCmds);
        }

        /**
          FOR NOW, this robo can only move from it current position to its adjacent position
          Which mean only move 1 tile.
          No diagonal supported, which also means this can only move up | down | left | right
        **/
        var moveRoboToAdjacentPosition = function(aRobo, adjacentPosition) {
            var cmds = [];
            var xDirection = adjacentPosition.x - aRobo.pos.x;
            if (xDirection < 0) {
                // move backward
                // Is the robo already facing LEFT, if not, need to make sure direction is LEFT.
                cmds = cmds.concat(makeRoboFaceLeft(aRobo));
            } else if (xDirection > 0) {
                // move forthward
                // Is the robo already facing RIGHT, if not, need to make sure direction is RIGHT.
                cmds = cmds.concat(makeRoboFaceRight(aRobo));
            }
            var yDirection = adjacentPosition.y - aRobo.pos.y;

            if (yDirection < 0) {
                // move up
                // Is the robo already facing UP, if not, need to make sure direction is UP.
                cmds = cmds.concat(makeRoboFaceUp(aRobo));
            } else if (yDirection > 0) {
                // move down
                // Is the robo already facing DOWN, if not, need to make sure direction is DOWN.
                cmds = cmds.concat(makeRoboFaceDown(aRobo));
            }
            cmds.push(COMMANDS.move);
            return cmds;

        };

        var makeRoboFaceUp = function(aRobo) {
            return makeRoboFaceDirection(aRobo, DIRECTION.UP);
        }

        var makeRoboFaceDown = function(aRobo) {
            return makeRoboFaceDirection(aRobo, DIRECTION.DOWN);
        }

        var makeRoboFaceLeft = function(aRobo) {
            return makeRoboFaceDirection(aRobo, DIRECTION.LEFT);
        }

        var makeRoboFaceRight = function(aRobo) {
            return makeRoboFaceDirection(aRobo, DIRECTION.RIGHT);
        }

        function makeRoboFaceDirection(aRobo, direction) {
            var cmds = [];
            while (aRobo.direction != direction) {
                aRobo.turnLeft();
                cmds.push(COMMANDS.turnLeft);
            }
            return cmds;
        }


        function buildThenExecuteCmds() {
            var userDefinedCmds = buildCmdList();
            console.log(userDefinedCmds);
            if (!userDefinedCmds || userDefinedCmds.length == 0)
                return;

            executeCmdOnRobot(userDefinedCmds);
        }

        //TODO: handle F2 cmd
        function executeCmdOnRobot(userDefinedCmds) {
            userDefinedCmds.forEach(function(cmd, idx) {
                setTimeout(function() {
                    if (cmd != COMMANDS.f1) {
                        robo.execute(cmd);
                    } else {
                        executeCmdOnRobot(userDefinedCmds);
                    }
                }, TIMEOUT_250 * idx); // a delay, so we can see that robo do each step
            });
        }

        function buildCmdList() {
            var userDefinedCmds = [];
            var allImgIds = ['0', '1', '2', '3', '4', '5', '6'];
            allImgIds.forEach(function(id) {
                var img = document.getElementById('udCmd' + id);
                if (img.cmd) {
                    var parseCmd = getCmdFromValue(img.cmd);
                    if (parseCmd)
                        userDefinedCmds.push(parseCmd);
                }
            });
            return userDefinedCmds;
        }

        // JS does not support deep compare in all browsers, so my quick and dirty take for this
        // JSON.stringify(obj1) === JSON.stringify(obj2) 
        function getCmdFromValue(inputCmd) {
            var cmdStr = JSON.stringify(inputCmd);

            if (JSON.stringify(COMMANDS.turnLeft) === cmdStr)
                return COMMANDS.turnLeft;

            if (JSON.stringify(COMMANDS.turnRight) === cmdStr)
                return COMMANDS.turnRight;

            if (JSON.stringify(COMMANDS.move) === cmdStr)
                return COMMANDS.move;

            if (JSON.stringify(COMMANDS.f1) === cmdStr)
                return COMMANDS.f1;

            if (JSON.stringify(COMMANDS.f2) === cmdStr)
                return COMMANDS.f2;

            return null;
        }