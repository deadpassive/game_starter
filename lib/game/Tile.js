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