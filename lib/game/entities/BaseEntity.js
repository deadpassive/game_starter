/*global Utils namespace*/

var Entities = namespace("Game.Entities");
var States = namespace("Game.States");

Entities.BaseEntity = function(tile, speed, visibility, world) {
    this.tile = tile;
    this.world = world;
    this.speed = speed;
    this.visibility = visibility;
    this.stateMachine = new States.StateMachine(this);
};

Entities.BaseEntity.prototype.update = function() {
    this.stateMachine.update();
    // Update visibility of tiles
    if (this.visibility > 0)
        this.world.setTilesVisible(this.tile, this.visibility, true);
};

Entities.BaseEntity.prototype.draw = function(ctx, xOffset, yOffset, tileSize) {
    // only draw if this is on an explorer tile
    if (this.world.getTile(this.tile.x, this.tile.y).explored) {
        var currentXPix = (tileSize * this.tile.x) + xOffset;
        var currentYPix = (tileSize * this.tile.y) + yOffset;
            
        ctx.beginPath();
        ctx.rect(currentXPix, currentYPix, tileSize, tileSize);
        ctx.fillStyle = (this.colour) ? this.colour : "red";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
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