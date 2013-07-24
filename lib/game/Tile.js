/*global Game Utils*/

Game.Tile = function(x, y) {
    this.x = x;
    this.y = y;
};

Game.Tile.prototype.draw = function(ctx, xOffset, yOffset, tileSize) {
    var originX = (this.x * tileSize) + xOffset;
    var originY = (this.y * tileSize) + yOffset;
    
    ctx.beginPath();
    ctx.rect(originX, originY, tileSize, tileSize);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
};