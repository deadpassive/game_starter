/*global namespace*/

var State = namespace("Game.State");
var GClass = namespace("GClass");

State.State = (function() {
    var $this = function(name) {
        this.name = name ? name : "Unknown State";
    };
    
    GClass.extend(Object, $this, {
        
        enter: function(entity) {},
        execute: function(entity) {},
        exit: function(entity) {},
        draw: function(entity) {}

    });
    
    return $this;
})();

