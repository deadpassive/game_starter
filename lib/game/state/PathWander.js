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
            if (!entity.progressToNeighbour) {
                entity.progressToNeighbour = 0;
            }
            
            entity.progressToNeighbour += entity.speed;
            
            if (entity.progressToNeighbour >= 1) {
                entity.progressToNeighbour -= 1;
                entity.tile = entity.target;
            }
            
            if (entity.tile.x == entity.target.x && entity.tile.y == entity.target.y) {
                // we are at the target tile, see if there is more in the path
                if (!this.path.hasTiles()) {
                    this.getNewPath(entity);
                } else {
                    entity.target = this.path.nextTile();
                }
            }
        },
        
        getTarget: function(entity) {
            var targetX = Math.floor(entity.world.size * Math.random());
            var targetY = Math.floor(entity.world.size * Math.random());
            return entity.world.getTile(targetX, targetY);
        },
        
        getNewPath: function(entity) {
            var target = this.getTarget(entity);
            this.path = new State.Path(entity, target);
            entity.target = this.path.nextTile();
        },
        
        getNeighbourDistance: function(tile, neighbour) {
            if (tile.x == neighbour.x || tile.y == neighbour.y) {
                return 1;
            } else return 1.4;
        },
                
        draw: function(ctx, xOffset, yOffset, tileSize) {
            if (this.path) {
                this.path.draw(ctx, xOffset, yOffset, tileSize);
            }
        }
    });
    
    return $this;
})();

