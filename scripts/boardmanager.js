function BoardManager(board, matrix, starsLocation) {
    this.ctx = board.getContext('2d');
    this.matrix = matrix; // this is fixed, so no need to clone

    // clone it, by doing a dump filter
    this.starsLocation = starsLocation.filter(function(pos) {
        return true;
    });
}

BoardManager.prototype.init = function() {
    var manager = this;
    this.matrix.forEach(function(row, ridx) {
        row.forEach(function(col, cidx) {
            var img = createImage();
            manager.ctx.drawImage(img, 45 * cidx, 45 * ridx);
        });
    });
};

BoardManager.prototype.gameOver = function(){
	return !this.starsLocation || this.starsLocation.length == 0;
};

BoardManager.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, 540, 360);
}

BoardManager.prototype.drawStarList = function(starImg) {
    var canvas = this.ctx;
    this.starsLocation.forEach(function(pos) {
        canvas.drawImage(starImg, 45 * pos.x, 45 * pos.y);
    });
}

BoardManager.prototype.drawStar = function(starImg, pos) {
    this.ctx.drawImage(starImg, 45 * pos.x, 45 * pos.y);
}

BoardManager.prototype.handleRobotMove = function(roboInfo, imgs) {

    // check to see if the robo is in a tile WITH A Star
    var idxTileWithAStar = this.starsLocation.findIndex(function(starPos) {
        return starPos.x == roboInfo.pos.x && starPos.y == roboInfo.pos.y;
    });
    // found a match, remove the star
    if (idxTileWithAStar !== -1) {
        this.starsLocation.splice(idxTileWithAStar, 1);
    }

    var imgToDraw = getCurrentImg(roboInfo, imgs);
    this.ctx.drawImage(imgToDraw, 45 * roboInfo.pos.x, 45 * roboInfo.pos.y);
};

function createImage() {
    /*var image = new Image(50, 50);
    image.src = 'images/black_tile.png';*/
    var image = document.getElementById("blackTile");
    return image;
}

function getCurrentImg(robo, imgs) {

    if (robo.direction == DIRECTION.LEFT) {
        return imgs.left;
    } else if (robo.direction == DIRECTION.RIGHT) {
        return imgs.right;
    } else if (robo.direction == DIRECTION.UP) {
        return imgs.up;
    } else if (robo.direction == DIRECTION.DOWN) {
        return imgs.down;
    }
};