/*global namespace, Utils*/

var State = namespace("Game.State");
var GClass = namespace("GClass");

State.SimpleWander = (function() {
    var $this = function() {
        $this.base.constructor.call(this, "SimpleWander");
    };
    
    GClass.extend(State.State, $this, {
        
        execute: function(entity) {
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
        },
        
        getTarget: function(entity) {
            entity.targetX = entity.x + Utils.randomOption([-1, 0, 1]);
            entity.targetY = entity.y + Utils.randomOption([-1, 0, 1]);
            if (!entity.world.isValidTile(entity.targetX, entity.targetY)) {
                this.getTarget(entity);
            }
        }
        
    });
    
    return $this;
})();

