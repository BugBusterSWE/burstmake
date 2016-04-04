const Builder = require( "./builder.js" );

/**
The Solver hold the syntax tsconfig rule managed by application and the behavior for each its
*/
function Solver( makeopt ){
    // Configuration for all topic
    this.makeopt = makeopt;
}

/**
Create a partial tsconfig without included files. This is it because without the declaration
of hotpoint is impossibile estabilishing what is the files and their deep level between the root application and the
single file.
ATTENTION!!!!!! Not all set of tsconfig rule be supported! I will correct this mistake coming soon.
@param topic {string}   Topic with the specification of tsconfig
@return {Object}        The configuration object without included file          
*/
Solver.prototype.solve = function ( topic ) {
    // The function stored in buildRule tell as get the configuration in the actual level of hierarchy and how it integrate with them.
    var buildingRule = function ( config, actual ) {
        // In the case that a descendant set a option already set, the option will set at the value of descendant.
        if ( actual.compilerOptions.module !== undefined )              config.compilerOptions.module               =   actual.compilerOptions.module;
        if ( actual.compilerOptions.target !== undefined )              config.compilerOptions.target               =   actual.compilerOptions.target;
        if ( actual.compilerOptions.moduleResolution !== undefined )    config.compilerOptions.moduleResolution     =   actual.compilerOptions.moduleResolution;
        if ( actual.compilerOptions.noImplicitAny !== undefined )       config.compilerOptions.noImplicitAny        =   actual.compilerOptions.noImplicitAny;
        if ( actual.compilerOptions.removeComments !== undefined )      config.compilerOptions.removeComments       =   actual.compilerOptions.removeComments;
        if ( actual.compilerOptions.preserveConstEnums !== undefined )  config.compilerOptions.preserveConstEnums   =   actual.compilerOptions.preserveConstEnums;
        if ( actual.compilerOptions.outFile !== undefined )             config.compilerOptions.outFile              =   actual.compilerOptions.outFile;            
        if ( actual.compilerOptions.sourceMap !== undefined )           config.compilerOptions.sourceMap            =   actual.compilerOptions.sourceMap;
        if ( actual.compilerOptions.declaration !== undefined )         config.compilerOptions.declaration          =   actual.compilerOptions.declaration;
        if ( actual.compilerOptions.noEmitOnError !== undefined )       config.compilerOptions.noEmitOnError        =   actual.compilerOptions.noEmitOnError;
    };

    var builder = new Builder( buildingRule );

    // The topic should derive from other topic. With the while we follow the chian of hierarchy and build the rule to
    // create the completly tsconfig configure. 
    while ( topic !== undefined ) {
        var conf = this.makeopt[topic];

        if ( conf === null ) {
            throw "The topic " + topic + " not declared in the tsmake.json";     
        }
        // The building flow follow the chain of hierarchy, start by anchestor and end with the descendant
        builder.push( conf );
        // Get anchestor topic
        topic = conf.base;
    }

    return builder.build();
};

module.exports = Solver;

