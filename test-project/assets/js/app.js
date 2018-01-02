angular.module('app', ['ngRoute', 'ngMaterial'])
    .config(function($routeProvider) {

        $routeProvider
            .when('/list', {
                templateUrl : 'partials/todos.html',
                controller  : 'TodoListController'
            })
            .when('/create', {
                templateUrl : 'partials/create-todo.html',
                controller  : 'TodoCreationController'
            })
            .otherwise('/list');
    })
    .service('SimpleLogger', function($mdToast) {
        return {
            info : _info
        };

        function _info(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .hideDelay(3000)
            );
        }
    })
    .controller('MainController', function($scope) {


    })
    .controller('TodoListController', function($scope, $http, SimpleLogger) {
        $http.get('/todoentry').then(function(response) {
            $scope.entries = response.data;
        });

        $scope.update = function(entry) {
            $http.put('/todoentry/' + entry.id, entry)
                .then(function(response) {
                    SimpleLogger.info('Update');
                });
        }
    })
    .controller('TodoCreationController', function($scope, $http, $location, SimpleLogger) {
        $scope.entry = {};
        
        $scope.create = function() {
            if (!$scope.todoForm.$valid) return;

            $http.post('/todoentry', $scope.entry).then(function(response) {
                SimpleLogger.info('Entry ' + response.data.name + ' created.');
            });
        };
    });