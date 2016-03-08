'use strict';


angular.module('mean.realties').factory('Realties', ['$resource',
    function ($resource) {
        return $resource('api/realties/:realtyId', {
            realtyId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);