/*global namespace*/

var State = namespace("Game.State");
var GClass = namespace("GClass");

State.StateMachine = (function() {
    var $this = function(owner) {
        this.owner = owner;
        var test = "Hello";
    };
    
    GClass.extend(Object, $this, {
        update: function() {
            //if a global state exists, call its execute method
            if (this.globalState) this.globalState.execute(this.owner);
            //same for the current state
            if (this.currentState) this.currentState.execute(this.owner);
        },
        
        changeState: function(newState) {
            //keep a record of the previous state
            this.previousState = this.currentState;
            //call the exit method of the existing state
            if (this.currentState) this.currentState.exit(this.owner);
            //change state to the new state
            this.currentState = newState;
            //call the entry method of the new state
            this.currentState.enter(this.owner);
        },
        
        revertToPreviousState: function() {
            if (this.previousState) this.changeState(this.previousState);
        },
        
        isInState: function(state) {
            return this.currentState && this.currentState.name == state.name;
        },
        
        /**
         * Draw the current state.
         */
        draw: function(ctx, xOffset, yOffset, tileSize) {
            if (this.currentState) {
                this.currentState.draw(ctx, xOffset, yOffset, tileSize);
            }
        },
    });
    
    return $this;
})();

