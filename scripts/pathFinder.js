/*
 * This is just to list the points from a given startPos to endPos positions.
 Not a path finding, cause this assume there always a path from startPos to endPos.
 This does not support diagonal movement.
*/
function pathFromStartToEnd(startPos, endPos) {
    if (!startPos || !endPos) {
        throw new Error("Missing startPos or endPos.")
    }
    if (startPos.x == endPos.x && startPos.y == endPos.y) {
        throw new Error("startPos is same as endPos.")
    }

    var path = [];
    var startTmp = {x: startPos.x , y: startPos.y};
    var endTmp = {x: endPos.x , y: endPos.y};
    var xDirection = endTmp.x - startTmp.x;
    while (startTmp.x != endTmp.x) {
        if (xDirection < 0) {
            startTmp.x--;
        } else {
            startTmp.x++;
        }
        path.push({ x: startTmp.x, y: startTmp.y });
    }
    var yDirection = endTmp.y - startTmp.y;
    while (startTmp.y != endTmp.y) {
        if (yDirection < 0) {
            startTmp.y--;
        } else {
            startTmp.y++;
        }
        path.push({ x: startTmp.x, y: startTmp.y });
    }
    return path;
}
