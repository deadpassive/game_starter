/*global Game Utils*/

Game.Tile = function(x, y) {
    this.x = x;
    this.y = y;
    this.inView = false;
};

Game.Tile.prototype.draw = function(ctx, xOffset, yOffset, tileSize) {
    var originX = (this.x * tileSize) + xOffset;
    var originY = (this.y * tileSize) + yOffset;
    
    ctx.beginPath();
    ctx.rect(originX, originY, tileSize, tileSize);
    ctx.fillStyle = this.inView ? 'yellow' : 'grey';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
};

Game.Tile.prototype.toString = function() {
    return "Tile[" + this.x + "," + this.y + "]";
};

Game.Tile.prototype.straightLineDistance = function(end) {
    var xDiff = this.x - end.x;
    var yDiff = this.y - end.y;
    var dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
    return dist;
};

Game.Tile.prototype.actualDistance = function( end) {
    var xDiff = Math.abs(this.x - end.x);
    var yDiff = Math.abs(this.y - end.y);
    var dist = Math.max(xDiff, yDiff);
    return dist;
};

Game.Tile.prototype.manhattanDistance = function(end) {
    var xDiff = Math.abs(this.x - end.x);
    var yDiff = Math.abs(this.y - end.y);
    var dist = xDiff + yDiff;
    return dist;
};