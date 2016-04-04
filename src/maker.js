const Solver = require( "./solver.js" );

function Maker(){
}

/**
Start the application reading the tsmake.json to create the tsconfig.json files
@param file {string}    File within the configuration of project
*/
Maker.prototype.make = function ( file ) {
    // Use this object to creare one tsconfig file foreach hotpoint declared in tsmake
    var makeopt = JSON.parse( file );
    // Passing configuration that the Solver and the Builder use it to creata the tsconfig files
    var solver = new Solver( makeopt );    

    // Catch all hotpoint in tsmake
    Object.keys( makeopt.hotpoint ).forEach( function ( key ) {
        // Create a uncomplete tsconfig object        
        console.log( solver.solve( key ) );    
    });
};

/**
Export the only istance of the Maker
*/
module.exports = new Maker();

