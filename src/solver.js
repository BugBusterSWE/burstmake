const Builder = require( "./builder.js" );
const Straw = require( "./straw.js" );
const path = require( "path" );

/**
Remove attributes no-standard
@param config {Object} Object to remove no-standard attributes
*/
function clean( config ) {
    delete config.include;
    delete config.exclude;

    return config;
};

/**
The Solver hold the syntax tsconfig rule managed by application
and the behavior for each its. It use makeopt file only to get information
relative at the topics. In this way the topics are decouple by hotpoint and 
file positions, and so is possibile change project configuration easily.
@param makeopt {Object} tsmake.json configuration in Object form
*/
function Solver( makeopt ) {
    // Configuration for all topic
    this.makeopt = makeopt;
}

/**
Create a partial tsconfig without included files. This is it because without 
the declaration of hotpoint is impossibile estabilishing what is the files and
their deep level between the root application and the single file.

ATTENTION!!!!!! 
Not all set of tsconfig rule be supported! I will correct 
this mistake coming soon.
@param topic {string} Topic with the specification of tsconfig
@param hotpoint {string} Path where setting the topic
@return {Object} The configuration object without included file
*/
Solver.prototype.solve = function ( topic, hotpoint ) {
    // Save the starter topic
    var originalTopic = topic;
    
    // This function convert the path in relative path started form hotpoint
    var relative = function ( to ) {
	return path.relative( hotpoint, to );
    };

    // The function stored in buildRule tell as get the configuration in the
    // actual level of hierarchy and how it integrate with them.
    var buildingRule = function ( config, actual ) {
	// In this way, if any topic declare the compilerOptions this will not
	// include in the tsconfig.json
	if ( actual.compilerOptions !== undefined ) {
	    
	    if ( config.compilerOptions === undefined ) {
		// Attach an empty object
		config.compilerOptions = {};
	    }
	    // In the case that a descendant set a option already set,
	    // the option will set at the value of descendant.
            if ( actual.compilerOptions.module !== undefined ) {
		config.compilerOptions.module = actual.compilerOptions.module;
		
	    } if ( actual.compilerOptions.target !== undefined ) {
		config.compilerOptions.target = actual.compilerOptions.target;
		
	    } if ( actual.compilerOptions.moduleResolution !== undefined ) {
		config.compilerOptions.moduleResolution =
		    actual.compilerOptions.moduleResolution;
		
	    } if ( actual.compilerOptions.noImplicitAny !== undefined ) {
		config.compilerOptions.noImplicitAny =
		    actual.compilerOptions.noImplicitAny;
		
	    } if ( actual.compilerOptions.removeComments !== undefined ) {
		config.compilerOptions.removeComments =
		    actual.compilerOptions.removeComments;
		
	    } if ( actual.compilerOptions.preserveConstEnums !== undefined ) {
		config.compilerOptions.preserveConstEnums =
		    actual.compilerOptions.preserveConstEnums;
		
	    } if ( actual.compilerOptions.outDir !== undefined ) {
		config.compilerOptions.outDir =
		    // Append a slash at the end of path because node return relative path
		    // but tsconfig want the path with the slah final
		    relative( actual.compilerOptions.outDir ) + "/";
		
	    } if ( actual.compilerOptions.outFile !== undefined ) {
		config.compilerOptions.outFile =
		    relative( actual.compilerOptions.outFile );

	    } if ( actual.compilerOptions.sourceMap !== undefined ) {
		config.compilerOptions.sourceMap =
		    actual.compilerOptions.sourceMap;
		
	    } if ( actual.compilerOptions.declaration !== undefined ) {
		config.compilerOptions.declaration =
		    actual.compilerOptions.declaration;
		
	    } if ( actual.compilerOptions.noEmitOnError !== undefined ) {
		config.compilerOptions.noEmitOnError =
		    actual.compilerOptions.noEmitOnError;
	    }
	    
	} if ( actual.include !== undefined ) {

	    if ( config.include === undefined ) {
		// Attach an empty array
		config.include = [];
	    }

	    // Push all relative path
	    config.include = config.include.concat(
		// Apply the transformation function
		actual.include.map( relative )
	    );
	    
	} if ( actual.exclude !== undefined ) {
	    config.exclude = actual.exclude;
	}
    };

    var builder = new Builder( buildingRule );

    // The topic should derive from other topic. With the while we follow
    // the chain of hierarchy and build the rule to create the completly
    // tsconfig configure. 
    while ( topic !== undefined ) {
        var conf = this.makeopt[topic];

        if ( conf === null ) {
            throw "The topic " + topic + " not declared in the tsmake.json";
        }
        // The building flow follow the chain of hierarchy,
	// start by anchestor and end with the descendant
        builder.push( conf );
        // Get anchestor topic
        topic = conf.base;
    }

    var config = builder.build();

    // Pass configuration arguments extract by config. 
    var straw = new Straw({
	exclude: config.exclude // Exclude all file and directory
    });
        
    // Is necessary to simplified the next operations
    if ( config.include === undefined ) {
	config.include = [];
    }
    
    try {
	// Insert into config all file recursive present in the hotpoint
	config.include = config.include.concat(
	    straw.suck( hotpoint ).apply( relative ).push()
	);
    } catch ( e ) {
	throw "Impossible create the topic " +
	    originalTopic + " in: " + hotpoint + "\n" +
	    "Error " + JSON.stringify( e );
    }

    // Transport all file from include to files attribute so to work with they
    config.files = ( config.files === undefined ) ?
	config.include :
	config.files.concat( config.include );

    return clean( config );
};

module.exports = Solver;

