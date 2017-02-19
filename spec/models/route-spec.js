// based on https://developers.google.com/transit/gtfs/reference/routes-file
const Route = require('../../models/route');

describe('route', function () {
    let m;

    beforeEach(function () {
        m = new Route();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called Route', function () {
        expect(m.constructor.modelName).toBe('Route');
    });

    [
        'route_id',
        'agency_id',
        'route_short_name',
        'route_long_name',
        'route_desc',
        'route_type',
        'route_url',
        'route_color',
        'route_text_color',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'route_id',
        'agency_id',
        'route_short_name',
        'route_long_name',
        'route_desc',
        'route_url',
        'route_color',
        'route_text_color',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'route_type',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
        });
    });

    [
        'route_id',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is unique`, function () {
            expect(m.schema.paths[field].options.unique).toBe(true);
        });
    });

    [
        'route_id',
        'route_short_name',
        'route_long_name',
        'route_type',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'agency_id',
        'route_desc',
        'route_url',
        'route_color',
        'route_text_color',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });

    [
        'route_type',
    ]
    .forEach(function (field) {
        const min = 0;
        const max = 7;

        it(`should limit the value of ${field} to between ${min} and ${max}`, function () {
            expect(m.schema.paths[field].options.min).toBe(min);
            expect(m.schema.paths[field].options.max).toBe(max);
        });
    });
});
