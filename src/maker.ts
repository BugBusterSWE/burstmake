namespace BurstMake {
    export class Maker {
        public constructor() {}

        /**
         * Start the application reading the burstmake.json to create
         * the tsconfig.json files
         *
         * @param file {string} File within the configuration of project
         */
        public make( file : string ) : void {
            // Use this object to creare one tsconfig file foreach hotpoint declared
            // in tsmake
            var makeopt : any = JSON.parse( file );

            var solver : Solver = new Solver( makeopt );
            var publisher : Publisher = new Publisher();

            // Catch all hotpoint in burstmake
            Object.keys( makeopt.hotpoint ).forEach(
                function ( key : string ) {
                    // Create tsconfig object with information rleative to
                    // directory configuration project
                    var tsconfig : any = solver.solve(
                        key,
                        makeopt.hotpoint[key]
                    );
                    // Publish the tsconfig.json
                    publisher.publish( tsconfig, makeopt.hotpoint[key] );
                }
            );
        }
    }
}

module BurstMake {
    export = Maker;
}


