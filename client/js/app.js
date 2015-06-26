angular
.module('MovieDatabase', ['ngRoute','MovieDatabaseFilters'])
.config(function ($routeProvider, $locationProvider, $httpProvider, $provide) {
    'use strict';

    var movieResolve = function(MovieService) {
        return MovieService.loadList();
    };

    var actorResolve = function(ActorService) {
        return ActorService.loadList();
    };

    $routeProvider
    .when('/', {
        controller: 'MoviesListController',
        templateUrl: '/partial/index.html',
        resolve: {
            movieList: movieResolve
        }
    })
    .when('/movies', {
        controller: 'MoviesListController',
        templateUrl: '/partial/movies/list.html',
        resolve: {
            movieList: movieResolve
        }
    })
    .when('/movies/new', {
        controller: 'MoviesAddController',
        templateUrl: '/partial/movies/add.html'
    })
    .when('/movies/:id', {
        controller: 'MovieDetailController',
        resolve: {
            movie: function(MovieService, $route) {
                var movieId = $route.current.params.id;
                return MovieService.load(movieId);
            }
        },
        templateUrl: '/partial/movies/detail.html'
    })
    .when('/movies/:id/edit', {
        controller: 'MovieEditController',
        resolve: {
            movie: function(MovieService, $route) {
                var movieId = $route.current.params.id;
                return MovieService.load(movieId);
            }
        },
        templateUrl: '/partial/movies/edit.html'
    })
    .when('/actors/new', {
        controller: 'ActorAddController',
        templateUrl: '/partial/actors/add.html'
    })
    .when('/actors', {
        controller: 'ActorsListController',
        templateUrl: '/partial/actors/list.html',
        resolve: {
            actorList: actorResolve
        }
    })
    .when('/actors/:id', {
        controller: 'ActorDetailController',
        resolve: {
            movie: function(ActorService, $route) {
                var actorId = $route.current.params.id;
                return ActorService.load(actorId);
            }
        },
        templateUrl: '/partial/actors/detail.html'
    })
    .when('/actors/:id/edit', {
        controller: 'ActorEditController',
        resolve: {
            movie: function(ActorService, $route) {
                var actorId = $route.current.params.id;
                return ActorService.load(actorId);
            }
        },
        templateUrl: '/partial/movies/edit.html'
    })
    .when('/404', {
        controller: 'NotFoundController',
        templateUrl: '/partial/notFound.html'
    })
    .when('/error', {
        controller: 'ErrorController',
        templateUrl: '/partial/error.html'
    })
    .otherwise({
        redirectTo: function () {
            return '/404?culprit=client';
        }
    });

    // use the new History API (Angular provides automatic fallback)
    $locationProvider.html5Mode(true);

    // We explicitly have to set the HashPrefix to comply with Google's
    // crawlable hash prefix.
    $locationProvider.hashPrefix('!');

    $provide.factory('errorInterceptor', function($q, $location) {
        return {
            responseError: function(response) {
                var status = response.status;
                if (status === 404) {
                    $location.path('/404');
                    $location.search('culprit', 'server');
                } else if (status >= 500) {
                    $location.path('/error');
                    $location.search('culprit', 'server');
                }
                return $q.reject(response);
            }
        };
    });

    $httpProvider.interceptors.push('errorInterceptor');
});
