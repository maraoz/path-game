var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chunkSchema = new Schema({
  lastMoved: Number,
  location: {
    x: Number,
    y: Number
  },
});

var Player = mongoose.model('Player', chunkSchema);
module.exports = Player;
