const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: String,
    joinDate: Number,
});

module.exports = mongoose.model('Team', teamSchema);