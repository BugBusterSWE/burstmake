const fs = require( "fs" );
var maker = require( "./maker.js" );

/**
Expect that the burstmake file is in the root of application
*/
const PATH = process.cwd() + "/burstmake.json";

function Application() {
}

Application.prototype.run = function () {
    // Read file burstmake.json in the current directory process
    try {
        var file = fs.readFileSync( PATH, "utf-8" );
    } catch ( e ) {
        throw "Impossible read burstmake.json file. " +
	    "Make sure that it is presents in the root of project";
    }

    maker.make( file );
};

module.exports = new Application();
