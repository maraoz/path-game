const Chunk = require('./models/chunk');
const Player = require('./models/player');
const crypto = require('crypto');

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

	app.param('playerId', function(req, res, next, uuid) {

		Player.findOne({uuid: uuid}, (err, player) => {
			if (err) {
				return next(err);
			}
			if (player) {
				req.player = player;
			}
      return next();
		});
	});

  app.get('/api/players/:playerId', function (req, res) {
    if (!req.player) {
      // if no player, create one
      var ip = req.connection.remoteAddress;
      var hash = crypto.createHash('sha256')
              .update(ip+'s3cretS4lt', 'utf8').digest('hex')
      console.log(hash);
      Player.create({
        uuid: hash,
        lastMoved: 0,
        location: {
          x: 0,
          y: 0,
        }
      }, function (err, player) {
        if (err) {
          return res.send(err);
        }
        console.log(player)
        res.json(player);
      });
      return; 
    }
    res.json(req.player);
  });

  app.post('/api/players', function (req, res) {

  });

  app.get('/api/chunks', function (req, res) {
    getChunks(res);
  });

  app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
};
