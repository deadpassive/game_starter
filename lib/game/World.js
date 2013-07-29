/*global namespace*/

var game = namespace("Game");
var entities = namespace("Game.Entities");

game.World = function(size) {
    this.size = size;
    this.tileSize = 20;
    
    this.tiles = [];
    this.entities = [];
    
    // must set up tiles before entities
    for (var i = 0; i < size; i++) {
        this.tiles[i] = [];
        for (var j = 0; j < size; j++) {
            this.tiles[i][j] = new game.Tile(i, j);
        }
    }
    
    this.entities[0] = new entities.Tree(
            Math.floor(Math.random() * size), 
            Math.floor(Math.random() * size));
    this.entities[1] = new entities.Store(
            Math.floor(Math.random() * size), 
            Math.floor(Math.random() * size));
            
    for (i = 0; i < 5; i++) {
        this.entities.push(new entities.MovingEntity(
            Math.floor(Math.random() * size), 
            Math.floor(Math.random() * size), this));
    }
};

game.World.prototype.draw = function(ctx, xOffset, yOffset) {
    for (var x = 0; x < this.tiles.length; x++) {
        for (var y = 0; y < this.tiles[x].length; y++) {
            this.tiles[x][y].draw(ctx, xOffset, yOffset, this.tileSize);
        }
    }
    // Draw states
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].currentState) {
            this.entities[i].currentState.draw(ctx, xOffset, yOffset, this.tileSize);
        }
    }
    // Draw entities
    for (i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(ctx, xOffset, yOffset, this.tileSize);
    }
};

game.World.prototype.update = function(e) {
    // Clear visible tiles
    for (var x = 0; x < this.tiles.length; x++) {
        for (var y = 0; y < this.tiles[x].length; y++) {
            this.tiles[x][y].inView = false;
        }
    }
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].update();
    }
};

game.World.prototype.isValidTile = function(x, y) {
    return (x >= 0 && y >= 0 && x < this.size && y < this.size);
};

game.World.prototype.getTile = function(x, y) {
    if (this.isValidTile(x, y)) {
        return this.tiles[x][y];
    } else return null;
};

game.World.prototype.getNeighboursFor = function(tile, size) {
    var neighbours = [];
    if (!size) size = 1;
    for (var x = tile.x - size; x <= tile.x + size; x++) {
        for (var y = tile.y - size; y <= tile.y + size; y++) {
            var neighbour = this.getTile(x, y);
            if (neighbour !== null && neighbour != tile) {
                neighbours.push(neighbour);
            }
        }
    }
    return neighbours;
};

game.World.prototype.setTilesVisible = function(source, size) {
    var neighbours = this.getNeighboursFor(source, size);
    for (var i = 0; i < neighbours.length; i++) {
        neighbours[i].inView = true;
    }
};

game.World.prototype.zoomIn = function() {
    this.tileSize += 5;
};

game.World.prototype.zoomOut = function() {
    this.tileSize = Math.max(this.tileSize -= 5, 5);
};