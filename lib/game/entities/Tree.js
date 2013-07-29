/*global namespace Utils*/

var entities = namespace("Game.Entities");
var states = namespace("Game.States");

entities.Tree = function(tile, world) {
    entities.BaseEntity.call(this, tile, 0.1, 0, world);
    this.colour = "green";
};
// Inherit from BaseEntity
entities.Tree.prototype = new entities.BaseEntity();