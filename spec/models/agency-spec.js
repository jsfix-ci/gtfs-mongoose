// based on https://developers.google.com/transit/gtfs/reference/agency-file
const Agency = require('../../models/agency');

describe('agency', function () {
    let m;

    beforeEach(function () {
        m = new Agency();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    it('should be called Agency', function () {
        expect(m.constructor.modelName).toBe('Agency');
    });

    [
        'agency_id',
        'agency_name',
        'agency_url',
        'agency_timezone',
        'agency_lang',
        'agency_phone',
        'agency_fare_url',
        'agency_email',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'agency_id',
        'agency_name',
        'agency_url',
        'agency_timezone',
        'agency_lang',
        'agency_phone',
        'agency_fare_url',
        'agency_email',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'agency_id',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is unique`, function () {
            expect(m.schema.paths[field].options.unique).toBe(true);
        });
    });

    [
        'agency_name',
        'agency_url',
        'agency_timezone',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'agency_id',
        'agency_lang',
        'agency_phone',
        'agency_fare_url',
        'agency_email',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });
});
