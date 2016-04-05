const readDir = require( "recursive-readdir-synchronous" );

/**
Object that perform the action of suck.
@param config {Object} 
Rappresent the configuration of straw. The option available are:
<ul>
<li> exclude : Array = List of file and directories to exclude
</ul>
*/
function Straw( config ) {
    // Array to inject at the tsconfig
    this.files = [];
    this.config = config;
}

/**
Apply a transformation at the extract content
@param transform {Function} Function to apply at the any element
@return {Straw} This Straw
*/
Straw.prototype.apply = function ( transform ) {
    // Apply transformation
    this.files = this.files.map( transform );
    return this;
};

/**
Get the files
@return {Array} File stored
*/
Straw.prototype.push = function () {
    return this.files;
};

/**
Extract all file present start from hotspot include, it will search in directory
and subdirectory.
@param source {string} Path to suck the files
@return {Straw} This Straw
*/
Straw.prototype.suck = function ( source ) {
    try {
	this.files = readDir( source, this.config.exclude );
    } catch ( e ) {
	throw e;
    }

    return this;
};


module.exports = Straw;
