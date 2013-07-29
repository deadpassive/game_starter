/*global namespace*/

var states = namespace("Game.States");

states.State = function(name) {
    this.name = name ? name : "Unknown State";
};

states.State.prototype.enter = function(entity) {};
states.State.prototype.execute = function(entity) {};
states.State.prototype.exit = function(entity) {};

states.State.prototype.draw = function(entity) {};