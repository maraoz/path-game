angular.module('gameController', [])
.controller('mainController', ['$scope','$http','Chunks', 'Players',
            function($scope, $http, Chunks, Players) {
  $scope.formData = {};
  $scope.loading = true;

  Players.get()
    .then(function(player) {
      $scope.player = player;

      

      return Chunks.get()
        .success(function(chunks) {
          $scope.chunks = chunks;
          $scope.loading = false;
        });
    })
    .catch(console.log)


}]);
