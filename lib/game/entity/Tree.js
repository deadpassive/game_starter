/*global namespace Utils*/

var Entity = namespace("Game.Entity");
var GClass = namespace("GClass");

Entity.Tree = (function(){
    var $this = function (tile, world) {
        $this.base.constructor.call(this, tile, world, {/* no properties */});
        this.colour = "green";
    };
    
    GClass.extend(Entity.BaseEntity, $this);

    return $this;
})();
