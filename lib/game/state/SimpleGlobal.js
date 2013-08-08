/*global namespace, Utils*/

var State = namespace("Game.State");
var GClass = namespace("GClass");

State.SimpleGlobal = (function(){
    var $this = function() {
        $this.base.constructor.call(this, "SimpleGlobal");
    };
    
    GClass.extend(State.State, $this, {
        
        update: function(entity) {
            if (entity.isHungry()) {
                
            }
        }
    });
    
    return $this;
})();
