var Chunk = require('./models/chunk');
var Player = require('./models/player');

const getChunks = (res) => {
  Chunk.find(function (err, chunks) {
    if (err) {
      res.send(err);
    }

    if (chunks.length === 0) {
      var map = [];
      for (var i = 0; i<7; i++) {
        map[i] = [];
        for (var j = 0; j<7; j++) {
          map[i][j] = (i%2 && j%2)?1:0
        }
      }
      console.log(map);
      var genesis = new Chunk({
        map,
        location: {
          x: 0,
          y: 0,
        }
      });
      genesis.save()
      return res.json([genesis]);
      
    }
    return res.json(chunks);

  });
};

module.exports = function(app) {

	app.param('playerId', function(req, res, next, id) {

		Playr.findOne(id, (err, player) => {
			if (err) {
				return next(err);
			}
			if (player) {
				req.player = player;
				return next();
			}

		  next(new Error('failed to load player'));
			
		});
	});

  app.get('/api/players/:playerId', function (req, res) {
    res.json(req.player);
  });

  app.post('/api/players', function (req, res) {
    var ip = req.connection.remoteAddress;
    Player.create({
      lastMoved: 0,
      location: {
        x: 0,
        y: 0,
      }
    }, function (err, player) {
      if (err) {
        return res.send(err);
      }
      res.json(player);
    });

  });

  app.get('/api/chunks', function (req, res) {
    getChunks(res);
  });

  app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
};
