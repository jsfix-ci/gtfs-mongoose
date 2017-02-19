// based on https://developers.google.com/transit/gtfs/reference/stops-file
const Stop = require('../../models/stop');

describe('stop', function () {
    let m;

    beforeEach(function () {
        m = new Stop();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called Stop', function () {
        expect(m.constructor.modelName).toBe('Stop');
    });

    [
        'stop_id',
        'stop_code',
        'stop_name',
        'stop_desc',
        'stop_lat',
        'stop_lon',
        'zone_id',
        'stop_url',
        'location_type',
        'parent_station',
        'stop_timezone',
        'wheelchair_boarding',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'stop_id',
        'stop_code',
        'stop_name',
        'stop_desc',
        'zone_id',
        'stop_url',
        'stop_timezone',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'stop_lat',
        'stop_lon',
        'location_type',
        'parent_station',
        'wheelchair_boarding',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
        });
    });

    [
        'stop_id',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is unique`, function () {
            expect(m.schema.paths[field].options.unique).toBe(true);
        });
    });

    [
        'stop_id',
        'stop_name',
        'stop_lat',
        'stop_lon',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'stop_code',
        'stop_desc',
        'zone_id',
        'stop_url',
        'location_type',
        'parent_station',
        'stop_timezone',
        'wheelchair_boarding',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });

    [
        'parent_station',
        'location_type',
    ]
    .forEach(function (field) {
        const min = 0;
        const max = 1;

        it(`should limit the value of ${field} to between ${min} and ${max}`, function () {
            expect(m.schema.paths[field].options.min).toBe(min);
            expect(m.schema.paths[field].options.max).toBe(max);
        });
    });

    [
        'wheelchair_boarding',
    ]
    .forEach(function (field) {
        const min = 0;
        const max = 2;

        it(`should limit the value of ${field} to between ${min} and ${max}`, function () {
            expect(m.schema.paths[field].options.min).toBe(min);
            expect(m.schema.paths[field].options.max).toBe(max);
        });
    });
});
