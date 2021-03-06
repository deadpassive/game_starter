/*global namespace*/

var Game = namespace("Game");
var GClass = namespace("GClass");
var Entity = namespace("Game.Entity");

Game.World = (function() {
    // Constructor
    var $this = function(size) {
        this.size = size;
        this.tileSize = 20;
        
        this.tiles = [];
        this.entities = [];
        
        // must set up tiles before entities
        for (var i = 0; i < size; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < size; j++) {
                this.tiles[i][j] = new Game.Tile(i, j);
            }
        }
        
        this.entities.push(new Entity.Tree(this.randomTile(), this));
        this.entities.push(new Entity.Store(this.randomTile(), this));
                
        for (i = 0; i < 2; i++) {
            this.entities.push(new Entity.Civilian(this.randomTile(), this));
        }
    };
    
    // Class functions
    GClass.extend(Object, $this, {
        randomTile: function() {
            return this.getTile(Math.floor(Math.random() * this.size), 
                    Math.floor(Math.random() * this.size));
        },
        
        draw: function(ctx, xOffset, yOffset) {
            for (var x = 0; x < this.tiles.length; x++) {
                for (var y = 0; y < this.tiles[x].length; y++) {
                    this.tiles[x][y].draw(ctx, xOffset, yOffset, this.tileSize);
                }
            }
            // Draw states
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].getStateMachine().draw(ctx, xOffset, yOffset, this.tileSize);
            }
            // Draw entities
            for (i = 0; i < this.entities.length; i++) {
                this.entities[i].draw(ctx, xOffset, yOffset, this.tileSize);
            }
            // Draw entities extra stuff (paths etc)
            for (i = 0; i < this.entities.length; i++) {
                this.entities[i].drawExtra(ctx, xOffset, yOffset, this.tileSize);
            }
            // Draw selections
            for (x = 0; x < this.tiles.length; x++) {
                for (y = 0; y < this.tiles[x].length; y++) {
                    this.tiles[x][y].drawSelected(ctx, xOffset, yOffset, this.tileSize);
                }
            }
        },
        
        update: function(e) {
            // Clear visible tiles
            for (var x = 0; x < this.tiles.length; x++) {
                for (var y = 0; y < this.tiles[x].length; y++) {
                    this.tiles[x][y].inView = false;
                }
            }
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
            }
        },
        
        // TODO: Should this go here or in Game.Canvas?
        /**
         * returns the tile at the given pixel, or null if there is none.
         */
        pixToTile: function(xPix, yPix, xOffset, yOffset) {
            var xTilePos = Math.floor((xPix - xOffset) / this.tileSize);
            var yTilePos = Math.floor((yPix - yOffset) / this.tileSize);
            return this.getTile(xTilePos, yTilePos) || null;
        },
        
        selectTile: function(x, y, xOffset, yOffset) {
            var tile = this.pixToTile(x, y, xOffset, yOffset);
            if (tile && tile !== null) {
                if (this.selectedTile) {
                    this.selectedTile.selected = false;
                }
                tile.selected = true;
                this.selectedTile = tile;
                return tile;
                // TODO: fire some kind of event
            }
        },
        
        isValidTile: function(x, y) {
            return (x >= 0 && y >= 0 && x < this.size && y < this.size);
        },
        
        getTile: function(x, y) {
            if (this.isValidTile(x, y)) {
                return this.tiles[x][y];
            } else return null;
        },
        
        getNeighboursFor: function(tile, size) {
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
        },
        
        setTilesVisible: function(source, size, round) {
            var neighbours = this.getNeighboursFor(source, size);
            
            neighbours.push(source);
            for (var i = 0; i < neighbours.length; i++) {
                if (!round || source.straightLineDistance(neighbours[i]) < size) {
                    neighbours[i].inView = true;
                    neighbours[i].explored = true;
                }
            }
        },
        
        zoomIn: function() {
            this.tileSize += 5;
        },
        
        zoomOut: function() {
            this.tileSize = Math.max(this.tileSize -= 5, 5);
        }
    });
    
    return $this;
})();

