angular.module('gameController', [])

	.controller('mainController', ['$scope','$http','Chunks', 'Players',
              function($scope, $http, Chunks, Players) {
		$scope.formData = {};
		$scope.loading = true;

		Chunks.get()
			.success(function(data) {
				$scope.chunks = data;
				$scope.loading = false;
			});


	}]);
