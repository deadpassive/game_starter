/*global namespace Utils*/

var entities = namespace("Game.Entities");
var states = namespace("Game.States");

entities.Store = function(x, y, world) {
    entities.BaseEntity.call(this, x, y, 0.1, world);
    this.colour = "blue";
};
// Inherit from BaseEntity
entities.Store.prototype = new entities.BaseEntity();