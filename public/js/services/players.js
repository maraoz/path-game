angular.module('playerService', [])

	.factory('Players', ['$http',function($http) {
		return {
			get : function(id) {
				return $http.get('/api/players/'+id);
			},
			put: function() {
				return $http.get('/api/players');
			},
		}
	}]);
