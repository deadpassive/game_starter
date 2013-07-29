/*global namespace*/

var states = namespace("Game.States");

states.StateMachine = function(owner) {
    this.owner = owner;
};

states.StateMachine.prototype.update = function() {
    //if a global state exists, call its execute method
    if (this.globalState) this.globalState.execute(this.owner);
    //same for the current state
    if (this.currentState) this.currentState.execute(this.owner);
};

states.StateMachine.prototype.changeState = function(newState) {
    //keep a record of the previous state
    this.previousState = this.currentState;
    //call the exit method of the existing state
    if (this.currentState) this.currentState.exit(this.owner);
    //change state to the new state
    this.currentState = newState;
    //call the entry method of the new state
    this.currentState.enter(this.owner);
};

states.StateMachine.prototype.revertToPreviousState = function() {
    if (this.previousState) this.changeState(this.previousState);
};

states.StateMachine.prototype.isInState = function(state) {
    return this.currentState && this.currentState.name == state.name;
};

/**
 * Draw the current state.
 */
states.StateMachine.prototype.draw = function(ctx, xOffset, yOffset, tileSize) {
    if (this.currentState) {
        this.currentState.draw(ctx, xOffset, yOffset, tileSize);
    }
};