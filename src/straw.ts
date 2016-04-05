namespace BurstMake{

    const readDir = require( "recursive-readdir-synchronous" );

    export class Straw {
        private config : any;
        // Array to inject at the tsconfig
        private files : Array<string>;

        /**
         * Object that perform the action of suck.
         *
         * @param config {Object}
         * Rappresent the configuration of straw. The option available are:
         * <ul>
         *     <li>
         *         exclude : Array = List of file and directories to exclude
         *     </li>
         * </ul>
         */
        public constructor( config : any ) {
            this.files = [];
            this.config = config;
        }

        /**
         * Apply a transformation at the extract content
         *
         * @param transform {Function} Function to apply at the any element
         * @return {Straw} This Straw
         */
        public apply( transform : Function ) : Straw {
            // Apply transformation
            this.files = this.files.map( transform );
            return this;
        }

        /**
         *  Get the files extract
         *  @return {Array} File sucked
         */
        public push() : Array<string> {
            return this.files;
        }

        /**
         * Extract all file present start from hotspot include, it will search
         * in directory and subdirectory.
         * 
         * @param source {string} Path to suck the files
         * @return {Straw} This Straw
         */
        public suck( source : string ) : Straw {
            try {
                this.files = readDir( source, this.config.exclude );

            } catch ( e : any ) {
                throw e;
            }

            return this;
        }
    }
}
