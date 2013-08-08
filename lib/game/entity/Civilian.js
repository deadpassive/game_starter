/*global namespace Utils*/

var Entity = namespace("Game.Entity");
var State = namespace("Game.State");
var GClass = namespace("GClass");

Entity.Civilian = (function() {
    
    var $this = function(tile, world) {
        // Call superclass constructor with init properties
        $this.base.constructor.call(this, tile, world, {
            // TODO: Move properties out into separate file
            speed: 0.2,
            visibility : 5
        });
        this._stateMachine.globalState = new State.SimpleGlobal();
        this._stateMachine.changeState(new State.PathWander());
        this._hunger = 0;
    };
    
    GClass.extend(Entity.MovingEntity, $this, {
        isHungry: function() {
            this._hunger > 100;
        },
        
        update: function() {
            this.hunger++;
            Entity.BaseEntity.prototype.update.call(this);
        }
    });
    
    return $this;
})();
