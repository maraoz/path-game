angular.module('playerService', ['angular-storage'])

	.factory('Players',
  function(store, $http) {
		var PlayerService = function() {};
		PlayerService.prototype.get = function() {
        var uuid = store.get('uuid');
        return this.getFromServer(uuid);
			};
    PlayerService.prototype.getFromServer = function(uuid) {
      return $http.get('/api/players/'+(uuid!==null?uuid:'new'))
        .then(function(response) {
          var player = response.data;
          store.set('uuid', player.uuid)
          return player;
        })
    };
	  PlayerService.prototype.put = function(uuid) {
      return $http.get('/api/players/'+uuid);
    };
    return new PlayerService();
	
	});
