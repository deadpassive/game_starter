/*global namespace*/
var State = namespace("Game.State");
var GClass = namespace("GClass");
var Utils = namespace("Utils");

State.Path = (function() {
    var $this = function(entity, goal) {
        this._entity = entity;
        this._goal = goal;
        this._path = this.findPath();
    };
    
    GClass.extend(Object, $this, {
        
        nextTile: function() {
            return this._path.shift();
        },
        
        hasTiles: function() {
            return (this._path && this._path.length > 0);
        },
        
        /**
         * Find the shortest known path between the start and end.
         */
        findPath: function() {
            var start = this._entity.getTile();
            var goal = this._goal;
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
                var neighbours = this._entity.getWorld().getNeighboursFor(current);
                for (var i = 0; i < neighbours.length; i++) {
                    var neighbour = neighbours[i];
                    var currentGScore = g_score.get(current);
                    //var tentative_g_score = currentGScore + this.getNeighbourDistance(current, neighbour);
                    var tentative_g_score = currentGScore + 1;  // TODO: why not use straightLineDistance for this?
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
        
        // TODO: make private?
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
        
        /**
         * Refresh the path based on new info.
         */
        refresh: function() {
            
        },
        
        isStillValid: function() {
            // Determine whether the path is valid
        },
        
        draw: function(ctx, xOffset, yOffset, tileSize) {
            if (this._path && this._path.length > 0) {
                var targetTile = this._path[this._path.length-1];
                
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