/**
Create the hotpoint project make a tsconfig.json file with the option declared
in the its topic. 
*/
function Publisher( makeopt ) {
    // Configuration for all hotpoint
    this.makeopt = makeopt
}

/**
Create tsconfig.json file in the path specified in the hotpoint
@param tsconfig {Object} 
Object to get all information needed creating a tsconfig.json file
@param hotpoint {string} Path where will creating the tsconfig.json file
*/
Publisher.prototype.publish = function ( tsconfig, hotpoint )  {
    console.log( tsconfig + " " + hotpoint );
};

module.exports = Publisher;

