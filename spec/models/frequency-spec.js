// based on https://developers.google.com/transit/gtfs/reference/frequencies-file
const Frequency = require('../../models/frequency');

describe('frequency', function () {
    let m;

    beforeEach(function () {
        m = new Frequency();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called Frequency', function () {
        expect(m.constructor.modelName).toBe('Frequency');
    });

    [
        'trip_id',
        'start_time',
        'end_time',
        'headway_secs',
        'exact_times',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'trip_id',
        'start_time',
        'end_time',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'headway_secs',
        'exact_times',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
        });
    });

    [
        'trip_id',
        'start_time',
        'end_time',
        'headway_secs',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'exact_times',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });

    [
        'exact_times',
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
