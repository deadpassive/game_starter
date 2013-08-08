/*global namespace Utils*/

var Entity = namespace("Game.Entity");
var State = namespace("Game.State");
var GClass = namespace("GClass");

Entity.MovingEntity = (function() {
    var $this = function(tile, world, props) {
        $this.base.constructor.call(this, tile, world, props);
        // this._stateMachine.changeState(new states.PathWander());
        // this._stateMachine.globalState = new states.SimpleGlobal();
        this._target = tile;
        this._progressToNeighbour = 0;
        if (props) {
            this._speed = props.speed ? props.speed : 0.4;
        }
    };
    
    GClass.extend(Entity.BaseEntity, $this, {
        
        getProgressToNeighbour: function() {
            return this._progressToNeighbour;  
        },
                
        goTowardsNeighbour: function(amount) {
            this._progressToNeighbour += amount;
        },
        
        getSpeed: function() {
            return this._speed;
        },
        
        setTarget: function(target) {
            this._target = target;
        },
        
        getTarget: function() {
            return this._target;
        },
        
        draw: function(ctx, xOffset, yOffset, tileSize) {
            var currentXPix = (tileSize * this._tile.x) + xOffset;
            var currentYPix = (tileSize * this._tile.y) + yOffset;
            var targetXPix = this._target ? (tileSize * this._target.x) + xOffset : currentXPix;
            var targetYPix = this._target ? (tileSize * this._target.y) + yOffset : currentYPix;
            
            var drawX = currentXPix + this._progressToNeighbour * (targetXPix - currentXPix);
            var drawY = currentYPix + this._progressToNeighbour * (targetYPix - currentYPix);
            
            ctx.beginPath();
            ctx.rect(drawX, drawY, tileSize, tileSize);
            ctx.fillStyle = (this.colour) ? this.colour : "red";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            
            if (this._stateMachine && this._stateMachine.currentState) {
                ctx.font = "10px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(this._stateMachine.currentState.getName(), drawX + tileSize + 2, drawY + 10);
            }
        }
        
    });
    
    return $this;
})();

