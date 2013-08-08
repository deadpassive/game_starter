/*global Utils namespace*/

var Entity = namespace("Game.Entity");
var State = namespace("Game.State");
var GClass = namespace("GClass");

Entity.BaseEntity = (function() {
    // Constructor
    var $this = function(tile, world, props) {
        this._tile = tile;
        this._world = world;
        this._visibility = props.visibility ? props.visibility : 0;
        this._stateMachine = new State.StateMachine(this);
    };
    
    // Class functions
    GClass.extend(Object, $this, {
        
        getWorld: function() {
            return this._world;
        },
        
        getStateMachine: function() {
            return this._stateMachine;
        },
        
        getTile: function() {
            return this._tile;
        },
        
        setTile: function(tile) {
            this._tile = tile;
        },
        
        update: function() {
            this._stateMachine.update();
            // Update visibility of tiles
            if (this._visibility > 0)
                this._world.setTilesVisible(this._tile, this._visibility, true);
        },
        
        draw: function(ctx, xOffset, yOffset, tileSize) {
            // only draw if this is on an explorer tile
            if (this._world.getTile(this._tile.x, this._tile.y).explored) {
                var currentXPix = (tileSize * this._tile.x) + xOffset;
                var currentYPix = (tileSize * this._tile.y) + yOffset;
                    
                ctx.beginPath();
                ctx.rect(currentXPix, currentYPix, tileSize, tileSize);
                ctx.fillStyle = this._colour || "red";
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }
        },
                
        revertToPreviousState: function() {
            
        }
    });
    
    return $this;
})();

