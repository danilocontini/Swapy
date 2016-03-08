'use strict';

angular.module('mean.realties').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('realties', {
      url: '/realties',
      templateUrl: 'realties/views/index.html'
    })
    .state('register', {
      url: '/register-realty',
      templateUrl: 'realties/views/register-realty.html'
    })
    .state('connections', {
      url: '/connections',
      templateUrl: 'realties/views/show-connections.html'
    });
  }
]);
