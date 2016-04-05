/**
The Builder create the uncomplete tsconfig object.
@param rule {Function}  
Set statment to apply for each state for composing 
the tsconfig object. The function require:
<ul>
<li>config - Configuration make for now</li>
<li>actual - Configuration for the current state</li>
</ul> 
*/
function Builder( rule ) {
    this.rule = rule;
    // The stack is the implementation of the hierarchy. 
    this.stack = new Array();
}

/**
Push functioner state to make the tsconfig object
@param state {Object} Configuration to build the tsconfig for a certain state
*/
Builder.prototype.push = function ( state ) {
    this.stack.push( state );
};

/**
Create a tsconfig with the state stored previously
@return {Object} Uncomplete tsconfig builded with the set of state
*/
Builder.prototype.build = function () {    
    var tsconfig = {};
    var state = this.stack.pop();

    // Stop when the stack is empty
    while ( state !== undefined ) {
        // Apply transform rule at tsconfig object apply the options declared
	// in the state object
        this.rule( tsconfig, state );
        // Next state
        state = this.stack.pop();    
    }

    return tsconfig;
};

module.exports = Builder;

