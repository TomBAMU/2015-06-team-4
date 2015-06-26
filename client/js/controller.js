(function() {
    'use strict';

    var app = angular.module('MovieDatabase');

    app.controller('AppController', function($scope) {
        $scope.title = 'Team 4 : The Movie Database';

        $scope.tabs=[
          {
            name: 'Home',
            href: '',
            active: true
          },
          {
            name: 'Movies',
            href: 'movies',
            active: false
          },
          {
            name: 'Actors',
            href: 'actors',
            active: false
          }
        ];

        $scope.switchActive = function(currentTab){
          angular.forEach($scope.tabs, function(tab){
            if(tab.name !== currentTab.name){
              tab.active = false;
            } else {
              tab.active = true;
            }
          });
          /*
          for(var tab in $scope.tabs){
            if(tab.name !== currentTab.name){
              tab.active = false;
            } else {
              tab.active = true;
            }
          }*/
        }
    });

    app.controller('WelcomeController', function() {
    });

    app.controller('MoviesListController',
        function($scope, $location, movieList) {
            $scope.movies = movieList.data;
            $scope.add = function () {
                $location.path('/movies/new');
            };

            $scope.predicate = 'title';
            $scope.reverse = false;
            $scope.order = function(predicate) {
                $scope.predicate = predicate;
                $scope.reverse = !$scope.reverse;
            };
        }
    );

    app.controller('MoviesAddController',
        function($scope, $http, $location) {
        $scope.movie = {};
        $scope.save = function (movie) {
            $http.post('/movies', movie)
            .success(function(res) {
                $location.path('/movies/' + res.id);
            });
        };
    });

    app.controller('MovieDetailController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.delete = function () {
            $http.delete('/movies/' + $scope.movie.id).success(function (res) {
                $location.path('/movies');
            });
        };
    });

    app.controller('MovieEditController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.save = function () {
            $http.put('/movies/' + $scope.movie.id, $scope.movie)
            .success(function (res) {
                $location.path('/movies/' + $scope.movie.id);
            });
        };
    });

    function ProblemController($scope, $location) {
        $scope.culprit = $location.search().culprit || 'unknown beast';
    }

    app.controller('NotFoundController', ProblemController);
    app.controller('ErrorController', ProblemController);
})();
