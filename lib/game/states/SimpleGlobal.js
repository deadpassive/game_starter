/*global namespace, Utils*/

var States = namespace("Game.States");

States.SimpleGlobal = function() {
    States.State.call(this, "SimpleGlobal");
};
States.SimpleGlobal.prototype = new States.State();