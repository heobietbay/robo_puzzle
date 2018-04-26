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
        var robo = new Robo(startPos = { x: 7, y: 4 });

        var starImg = document.getElementById("star");

        var mainBoard = document.getElementById('board');

        var boardManager = new BoardManager(mainBoard, MATRIX, STARS_LOCATION);
        // refresh every 30 mil sec
        var gameIntervalId = window.setInterval(() => window.requestAnimationFrame(function() {
            boardManager.clearCanvas();
            boardManager.init();
            boardManager.drawStarList(starImg);
            boardManager.handleRobotMove(robo, roboImgs);
        }), 30);

        var checkIntervalId = window.setInterval(() => {
            if (boardManager.gameOver()) {
                window.clearInterval(gameIntervalId);
                window.clearInterval(checkIntervalId);
                alert("Game over ^^");
            }
        }, 200);

        function buildThenExecuteCmds() {
            var userDefinedCmds = buildCmdList();
            console.log(userDefinedCmds);
            if(!userDefinedCmds || userDefinedCmds.length == 0)
                return;

            executeCmdOnRobot(userDefinedCmds);
        }

        //TODO: handle F1, F2 cmd
        function executeCmdOnRobot (userDefinedCmds)
        {
            userDefinedCmds.forEach(function (cmd,idx){
                setTimeout(function(){ 
                    if(cmd != COMMANDS.f1)
                    {
                       robo.execute(cmd);
                    }
                    else
                    {
                       executeCmdOnRobot(userDefinedCmds);
                    }
                }, 250* idx); // a delay, so we can see that robo do each step
            });
        }

        function buildCmdList() {
            var userDefinedCmds = [];
            var allImgIds = ['0', '1', '2', '3', '4', '5', '6'];
            allImgIds.forEach(function(id) {
                var img = document.getElementById('udCmd' + id);
                if (img.cmd) {
                    var parseCmd = getCmdFromValue(img.cmd);
                    if(parseCmd)
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