'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.realties').factory('Realties', ['$resource',
  function($resource) {
    return $resource('api/realties/:realtyId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
