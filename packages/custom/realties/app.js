'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var Realties = new Module('realties');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Realties.register(function (app, auth, database, circles, swagger) {

    //We enable routing. By default the Package Object is passed to the routes
    Realties.routes(app, auth, database);

    Realties.aggregateAsset('css', 'realties.css');
    Realties.aggregateAsset('js', 'd3.v3.min.js');

    return Realties;
});