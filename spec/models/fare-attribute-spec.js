// based on https://developers.google.com/transit/gtfs/reference/fare_attributes-file
const FareAttribute = require('../../models/fare-attribute');

describe('fare-attribute', function () {
    let m;

    beforeEach(function () {
        m = new FareAttribute();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called FareAttribute', function () {
        expect(m.constructor.modelName).toBe('FareAttribute');
    });

    [
        'fare_id',
        'price',
        'currency_type',
        'payment_method',
        'transfers',
        'transfer_duration',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'fare_id',
        'currency_type',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'price',
        'payment_method',
        'transfers',
        'transfers',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
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
        'price',
        'currency_type',
        'payment_method',
        'transfers',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'transfer_duration',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });

    [
        'payment_method',
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
        'transfers',
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
