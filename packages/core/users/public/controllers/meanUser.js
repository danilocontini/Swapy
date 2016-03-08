'use strict';

angular.module('mean.users')
  .controller('AuthCtrl', ['$scope', '$rootScope', '$http', '$state', 'Global',
    function($scope, $rootScope, $http, $state, Global) {
      // This object will contain list of available social buttons to authorize
      $scope.socialButtonsCounter = 0;
      $scope.global = Global;
      $scope.$state = $state;

      $http.get('/api/get-config')
        .success(function(config) {
          if(config.hasOwnProperty('local')) delete config.local; // Only non-local passport strategies
          $scope.socialButtons = config;
          $scope.socialButtonsCounter = Object.keys(config).length;
        });
    }
  ])
  .controller('LoginCtrl', ['$rootScope', 'MeanUser',
    function($rootScope, MeanUser) {
      var vm = this;

      // This object will be filled by the form
      vm.user = {};
      
      vm.input = {
        type: 'password',
        placeholder: 'Senha',
        confirmPlaceholder: 'Repetir Senha',
        iconClass: 'visibility',
        tooltipText: 'Mostrar senha'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Senha' ? 'Senha Visível' : 'Senha';
        vm.input.iconClass = vm.input.iconClass === 'visibility_off' ? 'visibility' : 'visibility_off';
        vm.input.tooltipText = vm.input.tooltipText === 'Mostrar senha' ? 'Esconder senha' : 'Mostrar senha';
      };

      $rootScope.$on('loginfailed', function(){
        vm.loginError = MeanUser.loginError;
      });

      // Register the login() function
      vm.login = function() {
        MeanUser.login(this.user);
      };
    }
  ])
  .controller('RegisterCtrl', ['$rootScope', 'MeanUser',
    function($rootScope, MeanUser) {
      var vm = this;

      vm.user = {};
      
      vm.registerForm = MeanUser.registerForm = true;

      vm.input = {
        type: 'password',
        placeholder: 'Senha',
        placeholderConfirmPass: 'Repetir Senha',
        iconClassConfirmPass: 'visibility',
        tooltipText: 'Mostrar senha',
        tooltipTextConfirmPass: 'Mostrar senha'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Senha' ? 'Senha Visível' : 'Senha';
        vm.input.iconClass = vm.input.iconClass === 'visibility_off' ? 'visibility' : 'visibility_off';
        vm.input.tooltipText = vm.input.tooltipText === 'Mostrar senha' ? 'Esconder senha' : 'Mostrar senha';
      };
      vm.togglePasswordConfirmVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholderConfirmPass = vm.input.placeholderConfirmPass === 'Repetir Senha' ? 'Senha Visível' : 'Repetir Senha';
        vm.input.iconClassConfirmPass = vm.input.iconClassConfirmPass === 'visibility_off' ? 'visibility' : 'visibility_off';
        vm.input.tooltipTextConfirmPass = vm.input.tooltipTextConfirmPass === 'Mostrar senha' ? 'Esconder senha' : 'Mostrar senha';
      };

      // Register the register() function
      vm.register = function() {
        MeanUser.register(this.user);
      };

      $rootScope.$on('registerfailed', function(){
        vm.registerError = MeanUser.registerError;
      });
    }
  ])
  .controller('ForgotPasswordCtrl', ['MeanUser', '$rootScope',
    function(MeanUser, $rootScope) {
      var vm = this;
      vm.user = {};      
      vm.registerForm = MeanUser.registerForm = false;
      vm.forgotpassword = function() {
        MeanUser.forgotpassword(this.user);
      };
      $rootScope.$on('forgotmailsent', function(event, args){
        vm.response = args;
      });
    }
  ])
  .controller('ResetPasswordCtrl', ['MeanUser',
    function(MeanUser) {
      var vm = this;
      vm.user = {};      
      vm.registerForm = MeanUser.registerForm = false;
      vm.resetpassword = function() {
        MeanUser.resetpassword(this.user);
      };
    }
  ]);