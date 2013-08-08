/*global namespace Utils*/

var State = namespace("Game.State");
var GClass = namespace("GClass");

State.PathWander = (function() {
    var $this = function() {
        $this.base.constructor.call(this, "PathWander");
    };
    
    GClass.extend(State.State, $this, {
        
        enter: function(entity) {
            this.getNewPath(entity);
        },
        
        execute: function(entity) {
            // TODO: should probably move this into MovingEntity as the logic should be similar for loads of states
            
            // TODO: should have some kind of incremental movement method
            entity.goTowardsNeighbour(entity.getSpeed());
            
            if (entity.getProgressToNeighbour() >= 1) {
                // If we've overshot we can use our "movement points" next turn
                entity.goTowardsNeighbour(-1);
                entity.setTile(entity.getTarget());
            }
            
            if (entity.getTile().x == entity.getTarget().x && entity.getTile().y == entity.getTarget().y) {
                // we are at the target tile, see if there is more in the path
                if (!this._path.hasTiles()) {
                    this.getNewPath(entity);
                } else {
                    entity.setTarget(this._path.nextTile());
                }
            }
        },
        
        getTarget: function(entity) {
            var world = entity.getWorld();
            var targetX = Math.floor(world.size * Math.random());
            var targetY = Math.floor(world.size * Math.random());
            return world.getTile(targetX, targetY);
        },
        
        getNewPath: function(entity) {
            var target = this.getTarget(entity);
            this._path = new State.Path(entity, target);
            entity.setTarget(this._path.nextTile());
        },
        
        getNeighbourDistance: function(tile, neighbour) {
            if (tile.x == neighbour.x || tile.y == neighbour.y) {
                return 1;
            } else return 1.4;
        },
                
        draw: function(ctx, xOffset, yOffset, tileSize) {
            if (this._path) {
                this._path.draw(ctx, xOffset, yOffset, tileSize);
            }
        }
    });
    
    return $this;
})();

