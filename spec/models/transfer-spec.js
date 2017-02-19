// based on https://developers.google.com/transit/gtfs/reference/transfers-file
const Transfer = require('../../models/transfer');

describe('transfer', function () {
    let m;

    beforeEach(function () {
        m = new Transfer();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called Transfer', function () {
        expect(m.constructor.modelName).toBe('Transfer');
    });

    [
        'from_stop_id',
        'to_stop_id',
        'transfer_type',
        'min_transfer_time',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'from_stop_id',
        'to_stop_id',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'transfer_type',
        'min_transfer_time',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
        });
    });

    [
        'from_stop_id',
        'to_stop_id',
        'transfer_type',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'min_transfer_time',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });

    [
        'transfer_type',
    ]
    .forEach(function (field) {
        const min = 0;
        const max = 3;

        it(`should limit the value of ${field} to between ${min} and ${max}`, function () {
            expect(m.schema.paths[field].options.min).toBe(min);
            expect(m.schema.paths[field].options.max).toBe(max);
        });
    });
});
