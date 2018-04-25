        function allowDrop(ev) {
            ev.preventDefault();
        }

        function onCommandDrop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData('cmd');
            if(!data)
                return;
            var imgUrl = ev.dataTransfer.getData("text");
            ev.target.src = imgUrl;
            ev.target.cmd = JSON.parse(data);
            // Clear the drag data cache (for all formats/types)
            ev.dataTransfer.clearData();
        }

        function dragStartHandler(ev, cmd) { 
            ev.dataTransfer.setData("cmd", JSON.stringify(cmd));
        };

        function onMoveClick() {
            robo.move();
        }

        function onTurnLeftClick() {
            robo.turnLeft();
        }

        function onTurnRightClick() {
            robo.turnRight();
        };