// based on https://developers.google.com/transit/gtfs/reference/fare_rules-file
const FareRule = require('../../models/fare-rule');

describe('fare-rule', function () {
    let m;

    beforeEach(function () {
        m = new FareRule();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called FareRule', function () {
        expect(m.constructor.modelName).toBe('FareRule');
    });

    [
        'fare_id',
        'route_id',
        'origin_id',
        'destination_id',
        'contains_id',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'fare_id',
        'route_id',
        'origin_id',
        'destination_id',
        'contains_id',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'fare_id',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is unique`, function () {
            expect(m.schema.paths[field].options.unique).toBe(true);
        });
    });

    [
        'fare_id',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'route_id',
        'origin_id',
        'destination_id',
        'contains_id',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });
});
