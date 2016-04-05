const path = require( "path" );

/**
Correct the path of file started by a specified root
*/
function Leveler() {
}

/**
Set in the array passed by argument the relative path of files stated by a root
@param files {Array} Set path of files 
@param root {string} Root to start
@return {Array} Set the relative path of files started by root
*/
Leveler.prototype.leveling = function ( files, root ) {
    files.forEach( function ( file, index, array ) {
	array[index] = path.relative( root, file );
    });

    return files;
};

module.exports = Leveler;
