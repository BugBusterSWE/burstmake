const fs = require( "fs" );
var maker = require( "./maker.js" );

/**
Expect that the bustersmake file is in the root of application
*/
const PATH = __dirname + "/../../../bustersmake.json";

function Application() {
}

Application.prototype.run = function () {
    // Read file bustersmake.json in the current directory process
    try {
        var file = fs.readFileSync( PATH, "utf-8" );
    } catch ( e ) {
        throw "Impossible read bustersmake.json file. " +
	    "Make sure that it present in the root of project";
    }

    maker.make( file );
};

module.exports = new Application();
