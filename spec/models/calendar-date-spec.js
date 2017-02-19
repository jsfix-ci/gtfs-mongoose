// based on https://developers.google.com/transit/gtfs/reference/calendar_dates-file
const CalendarDate = require('../../models/calendar-date');

describe('calendar-date', function () {
    let m;

    beforeEach(function () {
        m = new CalendarDate();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    it('should be called CalendarDate', function () {
        expect(m.constructor.modelName).toBe('CalendarDate');
    });

    [
        'service_id',
        'date',
        'exception_type',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'service_id',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'date',
        'exception_type',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
        });
    });

    [
        'service_id',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is unique`, function () {
            expect(m.schema.paths[field].options.unique).toBe(true);
        });
    });

    [
        'service_id',
        'date',
        'exception_type',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'exception_type',
    ]
    .forEach(function (field) {
        const min = 1;
        const max = 2;

        it(`should limit the value of ${field} to between ${min} and ${max}`, function () {
            expect(m.schema.paths[field].options.min).toBe(min);
            expect(m.schema.paths[field].options.max).toBe(max);
        });
    });
});
