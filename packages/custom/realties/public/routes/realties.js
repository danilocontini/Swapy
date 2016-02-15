'use strict';

angular.module('mean.realties').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('realties example page', {
      url: '/realties/example',
      templateUrl: 'realties/views/index.html'
    });
    $stateProvider.state('register', {
      url: '/register-realty',
      templateUrl: 'realties/views/register-realty.html'
    });
    $stateProvider.state('connections', {
      url: '/connections',
      templateUrl: 'realties/views/show-connections.html'
    });
  }
]);
