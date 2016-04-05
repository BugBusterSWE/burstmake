const fs = require( "fs" );

/**
Create the hotpoint project make a tsconfig.json file with the option declared
in the its topic. 
*/
function Publisher() {
}

/**
Create tsconfig.json file in the path specified in the hotpoint
@param tsconfig {Object} 
Object to get all information needed creating a tsconfig.json file
@param hotpoint {string} Path where will creating the tsconfig.json file
*/
Publisher.prototype.publish = function ( tsconfig, hotpoint )  {
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

