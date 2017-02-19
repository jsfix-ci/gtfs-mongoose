const models = require('./models/index');

module.exports = {
    models,
    modelMap: {
        'agency.txt': 'Agency',
        'calendar.txt': 'Calendar',
        'calendar_dates.txt': 'CalendarDate',
        'fare_attribues.txt': 'FareAttribute',
        'fare_rules.txt': 'FareRule',
        'feed_info.txt': 'FeedInfo',
        'frequencies.txt': 'Frequency',
        'routes.txt': 'Route',
        'shapes.txt': 'Shape',
        'stops.txt': 'Stop',
        'stop_times.txt': 'StopTime',
        'transfers.txt': 'Transfer',
        'trips.txt': 'Trip',
    },
    getModelForFile(file) {
        return this.models[this.modelMap[file]];
    },
};
