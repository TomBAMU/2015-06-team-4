(function() {
    'use strict';

    var app = angular.module('MovieDatabase');

    app.controller('AppController', function($scope) {
        $scope.title = 'Team 4 : The Movie Database';
    });

    app.controller('WelcomeController', function() {
    });

    app.controller('MoviesListController',
        function($scope, $location, movieList) {
            $scope.movies = movieList.data;
            $scope.searchTerm = '';
            $scope.add = function () {
                $location.path('/movies/new');
            };
    });

    app.controller('MoviesAddController',
        function($scope, $http, $location) {
        $scope.movie = {};
        $scope.valid = false;
        $scope.save = function (movie) {
            $http.post('/movies', movie)
            .success(function(res) {
                $location.path('/movies/' + res.id);
            });
        };
        $scope.validate = function(){
            if($scope.movie.year < 1900 || $scope.movie.year > 2020){
                $scope.valid = false;
            }else{
                $scope.valid = true;
            }
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

    app.controller('ActorsListController',
        function($scope, $location, actorList) {
            $scope.actors = actorList.data;
            $scope.add = function () {
                $location.path('/actors/new');
            };

            $scope.predicate = 'title';
            $scope.reverse = false;
            $scope.order = function(predicate) {
                $scope.predicate = predicate;
                $scope.reverse = !$scope.reverse;
            };
        }
    );

    app.controller('ActorAddController',
        function($scope, $http, $location) {
        $scope.actor = {};
        $scope.save = function (actor) {
            $http.post('/actor', actor)
            .success(function(res) {
                $location.path('/actor/' + res.id);
            });
        };
    });

    app.controller('ActorDetailController',
        function($scope, $http, $location, actor) {

        $scope.actor = actor.data;
        $scope.delete = function () {
            $http.delete('/actors/' + $scope.actor.id).success(function (res) {
                $location.path('/actors');
            });
        };
    });

    app.controller('ActorEditController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.save = function () {
            $http.put('/actors/' + $scope.actor.id, $scope.actor)
            .success(function (res) {
                $location.path('/actors/' + $scope.actor.id);
            });
        };
    });

    function ProblemController($scope, $location) {
        $scope.culprit = $location.search().culprit || 'unknown beast';
    }

    app.controller('NotFoundController', ProblemController);
    app.controller('ErrorController', ProblemController);

})();
