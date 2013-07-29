/*global namespace Utils*/

var entities = namespace("Game.Entities");
var states = namespace("Game.States");

entities.MovingEntity = function(tile, world) {
    entities.BaseEntity.call(this, tile, 0.1, 2, world);
    this.stateMachine.changeState(new states.PathWander());
    this.stateMachine.globalState = new states.SimpleGlobal();
};
// Inherit from BaseEntity
entities.MovingEntity.prototype = new entities.BaseEntity();

entities.MovingEntity.prototype.draw = function(ctx, xOffset, yOffset, tileSize) {
    var currentXPix = (tileSize * this.tile.x) + xOffset;
    var currentYPix = (tileSize * this.tile.y) + yOffset;
    var targetXPix = (tileSize * this.target.x) + xOffset;
    var targetYPix = (tileSize * this.target.y) + yOffset;
    
    var drawX = currentXPix + this.moveProgress * (targetXPix - currentXPix);
    var drawY = currentYPix + this.moveProgress * (targetYPix - currentYPix);
    
    ctx.beginPath();
    ctx.rect(drawX, drawY, tileSize, tileSize);
    ctx.fillStyle = (this.colour) ? this.colour : "red";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    if (this.stateMachine && this.stateMachine.currentState) {
        ctx.font = "10px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.stateMachine.currentState.name, drawX + tileSize + 2, drawY + 10);
    }
};