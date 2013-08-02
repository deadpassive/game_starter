/*global namespace*/

var Entity = namespace("Game.Entity");
var GClass = namespace("GClass");

Entity.Store = (function(){
    
    var $this = function(tile, world) {
        $this.base.constructor.call(this, tile, world, {/* no properties */});
        this.colour = "blue";
    };
    
    GClass.extend(Entity.BaseEntity, $this);
    
    return $this;
})();
