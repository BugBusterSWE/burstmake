const app = require( "./application.js" );

// Catch global exception throw througout the application flow
try {
    app.run();
} catch ( e ) {
    console.error( e );
}


