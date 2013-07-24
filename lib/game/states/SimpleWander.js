/*global namespace, Utils*/

var states = namespace("Game.States");

states.SimpleWander = function() {
    states.State.call(this, "Wander");
};
states.SimpleWander.prototype = new states.State();

states.SimpleWander.prototype.execute = function(entity) {
    // Get a target tile
    if (!entity.targetX || !entity.targetY) {
        this.getTarget(entity);
    }
    
    if (!entity.moveProgress) {
        entity.moveProgress = 0;
    }
    
    entity.moveProgress += entity.speed;
    
    if (entity.moveProgress >= 1) {
        entity.moveProgress -= 1;
        entity.x = entity.targetX;
        entity.y = entity.targetY;
        // Get a new target
        this.getTarget(entity);
    }
};

states.SimpleWander.prototype.getTarget = function(entity) {
    entity.targetX = entity.x + Utils.randomOption([-1, 0, 1]);
    entity.targetY = entity.y + Utils.randomOption([-1, 0, 1]);
    if (!entity.world.isValidTile(entity.targetX, entity.targetY)) {
        this.getTarget(entity);
    }
};