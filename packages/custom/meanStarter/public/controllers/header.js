'use strict';

<<<<<<< HEAD:packages/core/system/public/controllers/header.js
angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state', '$timeout', '$mdSidenav', '$log',
  function($scope, $rootScope, Menus, MeanUser, $state, $timeout, $mdSidenav, $log) {
    
=======
angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state',
  function ($scope, $rootScope, Menus, MeanUser, $state) {
>>>>>>> linnovate/master:packages/custom/meanStarter/public/controllers/header.js
    var vm = this;

    vm.menus = {};
    vm.hdrvars = {
      authenticated: MeanUser.loggedin,
      user: MeanUser.user,
      isAdmin: MeanUser.isAdmin
    };

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu (name, defaultMenu) {
      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function (menu) {
        vm.menus[name] = menu
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);
<<<<<<< HEAD:packages/core/system/public/controllers/header.js
    
    // Material Sidenav
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
      
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
      
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
      
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
    $scope.lftclose = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
    $scope.rgtclose = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
=======

    $scope.isCollapsed = false;
>>>>>>> linnovate/master:packages/custom/meanStarter/public/controllers/header.js

    $rootScope.$on('loggedin', function () {
      queryMenu('main', defaultMainMenu);

      vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin
      }
    });

    vm.logout = function () {
      MeanUser.logout()
    };

    $rootScope.$on('logout', function () {
      vm.hdrvars = {
        authenticated: false,
        user: {},
        isAdmin: false
      };
      queryMenu('main', defaultMainMenu);
      $state.go('home');
    });
  }
]);
