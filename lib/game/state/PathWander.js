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
            if (!entity.moveProgress) {
                entity.moveProgress = 0;
            }
            
            entity.moveProgress += entity.speed;
            
            if (entity.moveProgress >= 1) {
                entity.moveProgress -= 1;
                entity.tile = entity.target;
            }
            
            if (entity.tile.x == entity.target.x && entity.tile.y == entity.target.y) {
                // we are at the target tile, see if there is more in the path
                if (this.path.length === 0) {
                    this.getNewPath(entity);
                } else {
                    entity.target = this.path.shift();
                }
            }
        },
        
        getTarget: function(entity) {
            var targetX = Math.floor(entity.world.size * Math.random());
            var targetY = Math.floor(entity.world.size * Math.random());
            this.target = entity.world.getTile(targetX, targetY);
        },
        
        getNewPath: function(entity) {
            this.getTarget(entity);
            this.path = this.aStar(entity);
            entity.target = this.path.shift();
        },
        
        aStar: function(entity) {
            var start = entity.tile;
            var goal = this.target;
            var closedset = [];
            var openset = [start];
            var came_from = new Utils.ToStringMap();
            var g_score = new Utils.ToStringMap();
            var f_score = new Utils.ToStringMap();
            
            g_score.put(start, 0);
            f_score.put(start, g_score.get(start) + start.straightLineDistance(goal));
            
            while (openset.length > 0) {
                var current = this.getLowestFScore(openset, f_score); //the node in openset with lowest f_score
                if (current == goal)
                    return this.reconstructPath(came_from, goal);
                
                // remove current from openset
                var index = openset.indexOf(current);
                openset.splice(index, 1);
                // add current to closedset
                closedset.push(current);
                
                // for each neightbour
                var neighbours = entity.world.getNeighboursFor(current);
                for (var i = 0; i < neighbours.length; i++) {
                    var neighbour = neighbours[i];
                    var currentGScore = g_score.get(current);
                    //var tentative_g_score = currentGScore + this.getNeighbourDistance(current, neighbour);
                    var tentative_g_score = currentGScore + 1;
                    if (closedset.indexOf(neighbour) >= 0 && tentative_g_score >= g_score.get(neighbour))
                        continue;
                        
                    if (openset.indexOf(neighbour) == -1 || tentative_g_score < g_score.get(neighbour)) {
                        came_from.put(neighbour, current);
                        g_score.put(neighbour, tentative_g_score);
                        var neighbourGScore = g_score.get(neighbour);
                        f_score.put(neighbour, neighbourGScore + neighbour.straightLineDistance(goal));
                        if (openset.indexOf(neighbour) == -1) {
                            openset.push(neighbour);
                        }
                    }
                }
            }
            // return failure
            return null;
        },
        
        getNeighbourDistance: function(tile, neighbour) {
            if (tile.x == neighbour.x || tile.y == neighbour.y) {
                return 1;
            } else return 1.4;
        },
        
        getLowestFScore: function(openset, f_score) {
            var lowestSoFar;
            var toReturn;
            for (var i = 0; i < openset.length; i++) {
                var tile = openset[i];
                var score = f_score.get(tile);
                if (!lowestSoFar || score < lowestSoFar) {
                    lowestSoFar = score;
                    toReturn = tile;
                }
            }
            return toReturn;
        },
        
        reconstructPath: function(came_from, current_node) {
            // if current node in came from
            if (came_from.get(current_node)) {
                var p = this.reconstructPath(came_from, came_from.get(current_node));
                p.push(current_node);
                return p;
            } else {
                return [current_node];
            }
        },
        
        draw: function(ctx, xOffset, yOffset, tileSize) {
            if (this.path && this.path.length > 0) {
                var targetTile = this.path[this.path.length-1];
                
                var targetXPix = (tileSize * targetTile.x) + xOffset;
                var targetYPix = (tileSize * targetTile.y) + yOffset;
                
                ctx.beginPath();
                ctx.rect(targetXPix, targetYPix, tileSize, tileSize);
                ctx.fillStyle = "orange";
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }
        }
    });
    
    return $this;
})();
