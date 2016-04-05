const readDir = require( "recursive-readdir-synchronous" );
const fs = require( "fs" );
const Leveler = require( "./leveler.js" );

/**
Create the hotpoint project make a tsconfig.json file with the option declared
in the its topic. 
*/
function Publisher( makeopt ) {
}

/**
Create tsconfig.json file in the path specified in the hotpoint
@param tsconfig {Object} 
Object to get all information needed creating a tsconfig.json file
@param hotpoint {string} Path where will creating the tsconfig.json file
*/
Publisher.prototype.publish = function ( tsconfig, hotpoint )  {
    var files = [];
    var leveler = new Leveler();

    try {
	// Read all file inside directory specified in the hotpoint
	files = readDir( hotpoint );
    } catch ( e ) {
	throw "Impossible read directory " + hotpoint + " specified";
    }
    
    // Concat result with the files included in the attribute 'include'
    // and with their path started at the hotpoint
    tsconfig.include = leveler.leveling(
	tsconfig.include.concat( files ),
	hotpoint
    );

    // Rename 'include' in 'files'
    tsconfig.files = tsconfig.include;
    delete tsconfig.include;

    try {
	// Publish the tsconfig file!"
	fs.writeFileSync(
	    hotpoint + "tsconfig.json",
	    JSON.stringify( tsconfig ),
	    "utf-8"
	);
    } catch ( e ) {
	throw "Impossible create tsconfig.json file in " +
	    "the hotpoint "
	    + hotpoint;
    }
};

module.exports = Publisher;

