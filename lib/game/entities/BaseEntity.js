/*global Utils namespace*/

var Entities = namespace("Game.Entities");
var States = namespace("Game.States");

Entities.BaseEntity = function(x, y, speed, visibility, world) {
    this.x = x;
    this.y = y;
    this.world = world;
    this.speed = speed;
    this.visibility = visibility;
    this.stateMachine = new States.StateMachine(this);
};

Entities.BaseEntity.prototype.update = function() {
    this.stateMachine.update();
    // Update visibility of tiles
    if (this.visibility > 0)
        this.world.setTilesVisible(this.world.getTile(this.x, this.y), this.visibility);
};

Entities.BaseEntity.prototype.draw = function(ctx, xOffset, yOffset, tileSize) {
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

Entities.BaseEntity.prototype.changeState = function(newState) {
    if (this.currentState) {
        this.currentState.exit(this);
    }
    
    this.currentState = newState;
    this.currentState.enter(this);
};

Entities.BaseEntity.prototype.revertToPreviousState = function() {
    
}