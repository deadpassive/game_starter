/*global namespace Utils*/

var State = namespace("Game.State");
var GClass = namespace("GClass");

State.PathWander = (function() {
    var $this = function() {
        $this.base.constructor.call(this, "PathWander");
    };
    
    GClass.extend(State.State, $this, {
        
        enter: function(entity) {
            entity.travelTo(this.getTarget(entity));
        },
        
        execute: function(entity) {            
            if (entity.isAtDestination()) {
                entity.travelTo(this.getTarget(entity));
            }
        },
        
        getTarget: function(entity) {
            var world = entity.getWorld();
            var targetX = Math.floor(world.size * Math.random());
            var targetY = Math.floor(world.size * Math.random());
            return world.getTile(targetX, targetY);
        },
    });
    
    return $this;
})();

