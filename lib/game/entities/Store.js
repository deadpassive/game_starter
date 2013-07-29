/*global namespace Utils*/

var entities = namespace("Game.Entities");
var states = namespace("Game.States");

entities.Store = function(tile, world) {
    entities.BaseEntity.call(this, tile, 0.1, 0, world);
    this.colour = "blue";
};
// Inherit from BaseEntity
entities.Store.prototype = new entities.BaseEntity();