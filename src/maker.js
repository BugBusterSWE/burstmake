const Solver = require( "./solver.js" );
const Publisher = require( "./publisher.js" );

function Maker(){
}

/**
Start the application reading the bustersmake.json to create the tsconfig.json files
@param file {string} File within the configuration of project
*/
Maker.prototype.make = function ( file ) {
    // Use this object to creare one tsconfig file foreach hotpoint declared
    // in tsmake
    var makeopt = JSON.parse( file );

    var solver = new Solver( makeopt );
    var publisher = new Publisher();

    // Catch all hotpoint in tsmake
    Object.keys( makeopt.hotpoint ).forEach( function ( key ) {
        // Create tsconfig object with information rleative to
	// directory configuration project 
        var tsconfig = solver.solve( key, makeopt.hotpoint[key] );
	// Publish the tsconfig.json
	publisher.publish( tsconfig, makeopt.hotpoint[key] );
    });
};

/**
Export the only istance of the Maker
*/
module.exports = new Maker();

