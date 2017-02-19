// based on https://developers.google.com/transit/gtfs/reference/frequencies-file
const index = require('../../models/index');

describe('model-index', function () {
    [
        'Agency',
        'CalendarDate',
        'Calendar',
        'FareAttribute',
        'FareRule',
        'FeedInfo',
        'Frequency',
        'Route',
        'Shape',
        'StopTime',
        'Stop',
        'Transfer',
        'Trip',
    ]
    .forEach(function (model) {
        it(`should export the ${model} model`, function () {
            const m = new index[model]();
            expect(m).toBeDefined();
            expect(m.$isMongooseModelPrototype).toBe(true);
            expect(m.constructor.modelName).toBe(model);
        });
    });
});
