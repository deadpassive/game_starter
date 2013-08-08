/*global namespace*/

var State = namespace("Game.State");
var GClass = namespace("GClass");

State.StateMachine = (function() {
    var $this = function(owner) {
        this._owner = owner;
    };
    
    GClass.extend(Object, $this, {
        getGlobalState: function() {
            return this._globalState;
        },
        
        getCurrentState: function() {
            return this._currentState;
        },
        
        update: function() {
            //if a global state exists, call its execute method
            if (this._globalState) this._globalState.execute(this._owner);
            //same for the current state
            if (this._currentState) this._currentState.execute(this._owner);
        },
        
        changeState: function(newState) {
            //keep a record of the previous state
            this._previousState = this._currentState;
            //call the exit method of the existing state
            if (this._currentState) this._currentState.exit(this._owner);
            //change state to the new state
            this._currentState = newState;
            //call the entry method of the new state
            this._currentState.enter(this._owner);
        },
        
        revertToPreviousState: function() {
            if (this._previousState) this.changeState(this._previousState);
        },
        
        isInState: function(state) {
            return this._currentState && this._currentState.getName() == state.getName();
        },
        
        /**
         * Draw the current state.
         */
        draw: function(ctx, xOffset, yOffset, tileSize) {
            if (this._currentState) {
                this._currentState.draw(ctx, xOffset, yOffset, tileSize);
            }
        },
    });
    
    return $this;
})();

