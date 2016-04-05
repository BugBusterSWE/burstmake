#!/usr/bin/env node

const app = require( "./src/application.js" );

// Catch global exception throw througout the application flow
try {
    app.run();
} catch ( e ) {
    console.error( e );
}


