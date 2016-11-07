'use strict';

/* jshint -W098 */
angular.module('mean.realties').controller('RealtiesController', ['$scope',
  function ($scope, $timeout, $q, $log) {

        var self = this;

        self.simulateQuery = false;

        // list of `state` value/display objects
        self.states = loadAll();
        self.querySearch = querySearch;

        self.newState = newState;

        function newState(state) {
            alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }

        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                            Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                            Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                            Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                            North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                            South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                            Wisconsin, Wyoming';

            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }








        var owner = this;
        $scope.contactTypes = ['Email', 'Telefone', 'Celular', 'Comercial'];
        $scope.owner = {
            "fullname": "",
            "cpf": "",
            "contacts": [{
                "type": "",
                "value": ""
            }]
        };

        $scope.addContact = function () {
            var index = $scope.owner.contacts.length;
            console.log("add item " + index);
            $scope.owner.contacts.push({
                "type": "",
                "value": ""
            });
            index++;
        };
        $scope.removeContact = function (index) {
            console.log("remove item " + index);
            $scope.owner.contacts.splice(index, 1);
        }


        owner.create = function () {
            var owner = new Realties($scope.owner);
            owner.$save(function (response) {
                return true;
            });
            $scope.owner = {};
            console.log(owner);
        };
      $scope.propertyTypes = ['Casa', 'Casa Comercial', 'Sala', 'Terreno', 'Chácara', 'Galpão', 'Apartamento', 'Área', 'Prédio'];
	}
]);