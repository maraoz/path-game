var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chunkSchema = new Schema({
  map: Schema.Types.Mixed,
  location: {
    x: Number,
    y: Number
  },

});

var Chunk = mongoose.model('Chunk', chunkSchema);
module.exports = Chunk;
