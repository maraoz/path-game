angular.module('chunkService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Chunks', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/chunks');
			},
		}
	}]);
