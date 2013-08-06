/*global namespace Utils*/

var Entity = namespace("Game.Entity");
var State = namespace("Game.State");
var GClass = namespace("GClass");

Entity.MovingEntity = (function() {
    var $this = function(tile, world, props) {
        $this.base.constructor.call(this, tile, world, props);
        // this.stateMachine.changeState(new states.PathWander());
        // this.stateMachine.globalState = new states.SimpleGlobal();
        this.target = tile;
        this.progressToNeighbour = 0;
        if (props) {
            this.speed = props.speed ? props.speed : 0.1;
        }
    };
    
    GClass.extend(Entity.BaseEntity, $this, {
        
        draw: function(ctx, xOffset, yOffset, tileSize) {
            var currentXPix = (tileSize * this.tile.x) + xOffset;
            var currentYPix = (tileSize * this.tile.y) + yOffset;
            var targetXPix = this.target ? (tileSize * this.target.x) + xOffset : currentXPix;
            var targetYPix = this.target ? (tileSize * this.target.y) + yOffset : currentYPix;
            
            var drawX = currentXPix + this.progressToNeighbour * (targetXPix - currentXPix);
            var drawY = currentYPix + this.progressToNeighbour * (targetYPix - currentYPix);
            
            ctx.beginPath();
            ctx.rect(drawX, drawY, tileSize, tileSize);
            ctx.fillStyle = (this.colour) ? this.colour : "red";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            
            if (this.stateMachine && this.stateMachine.currentState) {
                ctx.font = "10px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(this.stateMachine.currentState.name, drawX + tileSize + 2, drawY + 10);
            }
        }
        
    });
    
    return $this;
})();

