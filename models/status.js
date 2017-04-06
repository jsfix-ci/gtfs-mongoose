const mongoose = require('mongoose');

const Realtime = mongoose.model('Status', new mongoose.Schema({
    date: String,
    time: String,
    name: String,
    status: String,
    text: String,
}));
module.exports = Realtime;
