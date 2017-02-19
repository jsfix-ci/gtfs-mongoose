// based on https://developers.google.com/transit/gtfs/reference/stops-file
const mongoose = require('mongoose');

const Stop = mongoose.model('Stop', new mongoose.Schema({
    stop_id: {
        type: String,
        unique: true,
        required: true,
    },
    stop_code: String,
    stop_name: {
        type: String,
        required: true,
    },
    stop_desc: String,
    stop_lat: {
        type: Number,
        required: true,
    },
    stop_lon: {
        type: Number,
        required: true,
    },
    zone_id: String,
    stop_url: String,
    location_type: {
        type: Number,
        min: 0,
        max: 1,
    },
    parent_station: {
        type: Number,
        min: 0,
        max: 1,
    },
    stop_timezone: String,
    wheelchair_boarding: {
        type: Number,
        min: 0,
        max: 2,
    },
}));
module.exports = Stop;
