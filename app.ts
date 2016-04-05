#!/usr/bin/env node

let app : BurstMake.Application = new App

// Catch global exception throw througout the application flow
try {
    app.run();
} catch ( e ) {
    console.error( e );
}


