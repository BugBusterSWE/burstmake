namespace BurstMake {
    const fs = require( "fs" );

    export class Application {
        // Expect that the burstmake file is in the root of application
        private PATH = `${__dirname}/../../../burstmake.json`;

        public constructor() {}

        public run() {
            let maker : Maker = new Maker();

            // Read file burstmake.json in the current directory process
            try {
                var file = fs.readFileSync( this.PATH, "utf-8" );
            } catch ( e ) {
                throw `Impossible read burstmake.json file.\n
                    Make sure that it is presents in the root of project`;
            }

            maker.make( file );
        }
    }
}

export = BurstMake;