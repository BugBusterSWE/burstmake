namespace BurstMake{

    export class Builder {
        private rule : Function;
        private stack : Array<any>;

        /**
         * The Builder create the tsconfig object.
         *
         * @param rule {Function}
         * Set statment to apply for each state for composing
         * the tsconfig object. The function arguments are:
         * <ul>
         *     <li>config : Object - Configuration make for now</li>
         *     <li>actual : Object - Configuration for the current state</li>
         * </ul>
         */
        public constructor( rule : Function ) {
            this.rule = rule;
            // The stack is the implementation of the hierarchy
            this.stack = [];
        }

        /**
         * Push functioner state to make the tsconfig object.
         *
         * @param state {Object}
         * Configuration to build the tsconfig for a certain state
         */
        public push( state : any ) : void {
            this.stack.push( state );
        }

        /**
         * Create a tsconfig with the state stored previously.
         *
         * @return {Object} tsconfig builded with the set of state
         */
        public build() : any {
            let tsconfig : any = {};
            let state : any = this.stack.pop();

            // Stop when the stack is empty
            while ( state !== undefined ) {
                // Apply transform rule at tsconfig object apply the
                // options declared in the state object
                this.rule( tsconfig, state );
                // Next state
                state = this.stack.pop();
            }

            return tsconfig;
        }
    }
}
