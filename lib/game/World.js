/*global namespace*/

var game = namespace("Game");
var entities = namespace("Game.Entities");

game.World = function(size) {
    this.size = size;
    this.tileSize = 20;
    
    this.tiles = [];
    this.entities = [];
    
    this.entities[0] = new entities.Tree(
            Math.floor(Math.random() * size), 
            Math.floor(Math.random() * size));
    this.entities[1] = new entities.Store(
            Math.floor(Math.random() * size), 
            Math.floor(Math.random() * size));
    this.entities[2] = new entities.MovingEntity(
            Math.floor(Math.random() * size), 
            Math.floor(Math.random() * size), this);
    
    for (var i = 0; i < size; i++) {
        this.tiles[i] = [];
        for (var j = 0; j < size; j++) {
            this.tiles[i][j] = new game.Tile(i, j);
        }
    }
};

game.World.prototype.draw = function(ctx, xOffset, yOffset) {
    for (var x = 0; x < this.tiles.length; x++) {
        for (var y = 0; y < this.tiles[x].length; y++) {
            this.tiles[x][y].draw(ctx, xOffset, yOffset, this.tileSize);
        }
    }
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(ctx, xOffset, yOffset, this.tileSize);
    }
};

game.World.prototype.update = function(e) {
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

game.World.prototype.getNeighboursFor = function(tile) {
    var neighbours = [];
    for (var x = tile.x - 1; x <= tile.x + 1; x++) {
        for (var y = tile.y - 1; x <= tile.y + 1; x++) {
            var neighbour = this.getTile(x, y);
            if (neighbour !== null && neighbour != tile) {
                neighbours.push(neighbour);
            }
        }
    }
};

game.World.prototype.zoomIn = function() {
    this.tileSize += 5;
};

game.World.prototype.zoomOut = function() {
    this.tileSize = Math.max(this.tileSize -= 5, 5);
};