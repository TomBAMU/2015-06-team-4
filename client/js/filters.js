(function() {
	'use strict';

	var filters = angular.module('MovieDatabaseFilters', []);
	filters.filter('searchMovie', function() {
		return function(array, searchTerm) {
			var filteredMovies = [];
			array.forEach(function(movie){
				if(movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					movie.description.toLowerCase().includes(searchTerm.toLowerCase())){
					filteredMovies.push(movie);
				}
			});
			return filteredMovies;
		};
	});
})();