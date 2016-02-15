'use strict';

/* jshint -W098 */
angular.module('mean.realties').controller('RealtiesController', ['$scope', 'Global', 'Realties',
  function($scope, Global, Realties) {
    $scope.global = Global;
    $scope.package = {
      name: 'realties'
    };
  }
]);
