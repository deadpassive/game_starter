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
        
        travelTo: function(goal) {
            this._path = new State.Path(this, goal);
            this.setTarget(this._path.nextTile());
        },
        
        update: function() {
            if (this._tile != this._target) {
                this.goTowardsNeighbour(this._speed);
            }
            
            // If progress > 1 it means we've reached the next tile
            if (this._progressToNeighbour > 1) {
                this._progressToNeighbour -= 1;
                // If we've overshot we can use our "movement points" next turn
                this.setTile(this._target);
            }
            
            if (this._tile == this._target && this._path.hasTiles()) {
                this._target = this._path.nextTile();
            }
                        
            $this.base.update.call(this);
        },
        
        /**
         * Find out whether the given entity has reached the end of it's current path
         */
        isAtDestination: function() {
            return (this._tile == this._path.getGoal());
        },
        
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
            this._currentXPix = (tileSize * this._tile.x) + xOffset;
            this._currentYPix = (tileSize * this._tile.y) + yOffset;
            var targetXPix = this._target ? (tileSize * this._target.x) + xOffset : this._currentXPix;
            var targetYPix = this._target ? (tileSize * this._target.y) + yOffset : this._currentYPix;
            
            this._currentXPix = this._currentXPix + this._progressToNeighbour * (targetXPix - this._currentXPix);
            this._currentYPix = this._currentYPix + this._progressToNeighbour * (targetYPix - this._currentYPix);
            
            ctx.beginPath();
            ctx.rect(this._currentXPix, this._currentYPix, tileSize, tileSize);
            ctx.fillStyle = (this.colour) ? this.colour : "red";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            
            if (this._stateMachine && this._stateMachine.getCurrentState()) {
                ctx.font = "10px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(this._stateMachine.getCurrentState().getName(), 
                        this._currentXPix + tileSize + 2, this._currentYPix + 10);
            }
        },
        
        drawExtra: function(ctx, xOffset, yOffset, tileSize) {
            if (this._path) {
                this._path.draw(ctx, xOffset, yOffset, tileSize);
            }
        }
    });
    
    return $this;
})();

