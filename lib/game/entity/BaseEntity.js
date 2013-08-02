/*global Utils namespace*/

var Entity = namespace("Game.Entity");
var State = namespace("Game.State");
var GClass = namespace("GClass");

Entity.BaseEntity = (function() {
    // Constructor
    var $this = function(tile, world, props) {
        this.tile = tile;
        this.world = world;
        this.visibility = props.visibility ? props.visibility : 0;
        this.stateMachine = new State.StateMachine(this);
    };
    
    // Class functions
    GClass.extend(Object, $this, {
        
        update: function() {
            this.stateMachine.update();
            // Update visibility of tiles
            if (this.visibility > 0)
                this.world.setTilesVisible(this.tile, this.visibility, true);
        },
        
        draw: function(ctx, xOffset, yOffset, tileSize) {
            // only draw if this is on an explorer tile
            if (this.world.getTile(this.tile.x, this.tile.y).explored) {
                var currentXPix = (tileSize * this.tile.x) + xOffset;
                var currentYPix = (tileSize * this.tile.y) + yOffset;
                    
                ctx.beginPath();
                ctx.rect(currentXPix, currentYPix, tileSize, tileSize);
                ctx.fillStyle = (this.colour) ? this.colour : "red";
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

