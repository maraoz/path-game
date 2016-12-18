angular.module('chunkController', [])

	.controller('mainController', ['$scope','$http','Chunks', function($scope, $http, Chunks) {
		$scope.formData = {};
		$scope.loading = true;

		Chunks.get()
			.success(function(data) {
				$scope.chunks = data;
				$scope.loading = false;
			});


	}]);
