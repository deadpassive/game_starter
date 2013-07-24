/*global namespace Utils*/

var entities = namespace("Game.Entities");
var states = namespace("Game.States");

entities.Tree = function(x, y, world) {
    entities.BaseEntity.call(this, x, y, 0.1, world);
    this.colour = "green";
};
// Inherit from BaseEntity
entities.Tree.prototype = new entities.BaseEntity();