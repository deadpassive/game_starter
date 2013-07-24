/*global namespace Utils*/

var states = namespace("Game.States");

states.PathWander = function() {
    states.State.call(this, "PathWander");
};
states.PathWander.prototype = new states.State();

states.PathWander.prototype.enter = function(entity) {};

states.PathWander.prototype.execute = function(entity) {
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

states.PathWander.prototype.getTarget = function(entity) {
    entity.targetX = Math.floor(entity.world.size * Math.random());
    entity.targetY = Math.floor(entity.world.size * Math.random());
};

states.PathWander.prototype.aStart = function(entity) {
    var start = entity.world.getTile(entity.x, entity.y);
    var goal = entity.world.getTile(this.targetX, this.targetY);
    var closedset = [];
    var openset = [start];
    var came_from;
    var g_score;
    var f_score;
    
    g_score[start] = 0;
    f_score[start] = g_score[start] + this.heuristic_cost_estimate(start, goal);
    
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
        var neighbours = entity.world.neighboursFor(current);
        for (var i = 0; i < neighbours.length; i++) {
            var neighbour = neighbours[i];
            var tentative_g_score = g_score[current] + 1;
            if (openset.indexOf(neighbour) > 0 && tentative_g_score >= g_score[neighbour])
                continue;
                
            if (openset.indexOf(neighbour) == -1 || tentative_g_score < g_score[neighbour]) {
                came_from[neighbour] = current;
                g_score[neighbour] = tentative_g_score;
                f_score[neighbour] = g_score[neighbour] + this.heuristic_cost_estimate(neighbour, goal);
                if (openset.indexOf(neighbour) == -1) {
                    openset.push(neighbour);
                }
            }
        }
    }
    // return failure
    return null;
};

states.PathWander.prototype.reconstructPath = function(came_from, current_node) {
    // if current node in came from
    if (came_from[current_node]) {
        var p = this.reconstructPath(came_from, came_from[current_node])
        p.push(current_node);
        return p;
    } else {
        return [current_node];
    }
}