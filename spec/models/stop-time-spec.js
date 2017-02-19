// based on https://developers.google.com/transit/gtfs/reference/stop_times-file
const StopTime = require('../../models/stop-time');

describe('stop-time', function () {
    let m;

    beforeEach(function () {
        m = new StopTime();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called StopTime', function () {
        expect(m.constructor.modelName).toBe('StopTime');
    });

    [
        'trip_id',
        'arrival_time',
        'departure_time',
        'stop_id',
        'stop_sequence',
        'stop_headsign',
        'pickup_type',
        'drop_off_type',
        'shape_dist_traveled',
        'timepoint',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'trip_id',
        'arrival_time',
        'departure_time',
        'stop_id',
        'stop_headsign',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'stop_sequence',
        'pickup_type',
        'drop_off_type',
        'shape_dist_traveled',
        'timepoint',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
        });
    });

    [
        'trip_id',
        'arrival_time',
        'departure_time',
        'stop_id',
        'stop_sequence',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'stop_headsign',
        'pickup_type',
        'drop_off_type',
        'shape_dist_traveled',
        'timepoint',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });

    [
        'pickup_type',
        'drop_off_type',
    ]
    .forEach(function (field) {
        const min = 0;
        const max = 3;

        it(`should limit the value of ${field} to between ${min} and ${max}`, function () {
            expect(m.schema.paths[field].options.min).toBe(min);
            expect(m.schema.paths[field].options.max).toBe(max);
        });
    });

    [
        'timepoint',
    ]
    .forEach(function (field) {
        const min = 0;
        const max = 1;

        it(`should limit the value of ${field} to between ${min} and ${max}`, function () {
            expect(m.schema.paths[field].options.min).toBe(min);
            expect(m.schema.paths[field].options.max).toBe(max);
        });
    });
});
