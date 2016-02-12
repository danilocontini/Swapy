'use strict';


//Setting up route
angular.module('mean.realties').config(['$meanStateProvider', '$urlRouterProvider',
  function ($meanStateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $meanStateProvider
            .state('home', {
                url: '/',
                templateUrl: 'realties/views/index.html'
            });
        $meanStateProvider
            .state('register-realty', {
                url: '/register-realty',
                templateUrl: 'realties/views/register-realty.html'
            });
        $meanStateProvider
            .state('show-connections', {
                url: '/show-connections',
                templateUrl: 'realties/views/show-connections.html'
            });
  }
]).config(['$locationProvider',
  function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
  }
]);