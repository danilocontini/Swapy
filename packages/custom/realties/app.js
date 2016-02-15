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
Realties.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Realties.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Realties.menus.add({
    title: 'Imóveis',
    link: 'realties example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  Realties.menus.add({
    title: 'Cadastrar Imóvel',
    link: 'register',
    roles: ['authenticated'],
    menu: 'main'
  });
  Realties.menus.add({
    title: 'Conexões',
    link: 'connections',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Realties.aggregateAsset('css', 'realties.css');
  Realties.aggregateAsset('css', '../less/custom.css');
  Realties.aggregateAsset('js', 'd3.v3.min.js');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Realties.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Realties.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Realties.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Realties;
});
