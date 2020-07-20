const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    playstyle: String,
    teamId: String
});

module.exports = mongoose.model('Player', playerSchema);