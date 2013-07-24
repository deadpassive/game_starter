/*global Utils namespace*/

var entities = namespace("Game.Entities");

entities.BaseEntity = function(x, y, speed, world) {
    this.x = x;
    this.y = y;
    this.world = world;
    this.speed = speed;
};

entities.BaseEntity.prototype.update = function() {
    if (this.currentState) {
        this.currentState.execute(this);
    }
};

entities.BaseEntity.prototype.draw = function(ctx, xOffset, yOffset, tileSize) {
    var currentXPix = (tileSize * this.x) + xOffset;
    var currentYPix = (tileSize * this.y) + yOffset;
        
    ctx.beginPath();
    ctx.rect(currentXPix, currentYPix, tileSize, tileSize);
    ctx.fillStyle = (this.colour) ? this.colour : "red";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
};

entities.BaseEntity.prototype.changeState = function(newState) {
    if (this.currentState) {
        this.currentState.exit();
    }
    
    this.currentState = newState;
    this.currentState.enter();
}