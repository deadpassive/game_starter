/*global namespace*/

var states = namespace("Game.States");

states.State = function(description) {
    this.description = description ? description : "Unkown State";
};

states.State.prototype.enter = function(entity) {};
states.State.prototype.execute = function(entity) {};
states.State.prototype.exit = function(entity) {};