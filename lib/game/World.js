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
    
    this.entities.push(new entities.Tree(this.randomTile(), this));
    this.entities.push(new entities.Store(this.randomTile(), this));
            
    for (i = 0; i < 2; i++) {
        this.entities.push(new entities.MovingEntity(this.randomTile(), this));
    }
};

game.World.prototype.randomTile = function() {
    return this.getTile(Math.floor(Math.random() * this.size), 
            Math.floor(Math.random() * this.size));
};

game.World.prototype.draw = function(ctx, xOffset, yOffset) {
    for (var x = 0; x < this.tiles.length; x++) {
        for (var y = 0; y < this.tiles[x].length; y++) {
            this.tiles[x][y].draw(ctx, xOffset, yOffset, this.tileSize);
        }
    }
    // Draw states
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].stateMachine.draw(ctx, xOffset, yOffset, this.tileSize);
    }
    // Draw entities
    for (i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(ctx, xOffset, yOffset, this.tileSize);
    }
    // Draw selections
    for (x = 0; x < this.tiles.length; x++) {
        for (y = 0; y < this.tiles[x].length; y++) {
            this.tiles[x][y].drawSelected(ctx, xOffset, yOffset, this.tileSize);
        }
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

game.World.prototype.selectTile = function(x, y, xOffset, yOffset) {
    var xTilePos = Math.floor((x - xOffset) / this.tileSize);
    var yTilePos = Math.floor((y - yOffset) / this.tileSize);
    var tile = this.getTile(xTilePos, yTilePos);
    if (tile && tile !== null) {
        if (this.selectedTile) {
            this.selectedTile.selected = false;
        }
        tile.selected = true;
        this.selectedTile = tile;
        // TODO: fire some kind of event
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

game.World.prototype.setTilesVisible = function(source, size, round) {
    var neighbours = this.getNeighboursFor(source, size);
    
    neighbours.push(source);
    for (var i = 0; i < neighbours.length; i++) {
        if (!round || source.straightLineDistance(neighbours[i]) < size) {
            neighbours[i].inView = true;
            neighbours[i].explored = true;
        }
    }
};

game.World.prototype.zoomIn = function() {
    this.tileSize += 5;
};

game.World.prototype.zoomOut = function() {
    this.tileSize = Math.max(this.tileSize -= 5, 5);
};