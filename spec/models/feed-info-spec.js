// based on https://developers.google.com/transit/gtfs/reference/feed_info-file
const FeedInfo = require('../../models/feed-info');

describe('feed-info', function () {
    let m;

    beforeEach(function () {
        m = new FeedInfo();
    });

    it('should be an instance of a mongoose model', function () {
        expect(m.$isMongooseModelPrototype).toBe(true);
    });

    // ensure the model is named correctly (i.e. a singular of the feed file name)
    it('should be called FeedInfo', function () {
        expect(m.constructor.modelName).toBe('FeedInfo');
    });

    [
        'feed_publisher_name',
        'feed_publisher_url',
        'feed_lang',
        'feed_start_date',
        'feed_end_date',
        'feed_version',
    ]
    .forEach(function (field) {
        it(`should have a field ${field}`, function () {
            expect(m.schema.paths[field]).toBeDefined();
        });
    });

    [
        'feed_publisher_name',
        'feed_publisher_url',
        'feed_lang',
        'feed_version',
    ]
    .forEach(function (field) {
        it(`should have a String field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('String');
        });
    });

    [
        'feed_start_date',
        'feed_end_date',
    ]
    .forEach(function (field) {
        it(`should have a Number field ${field}`, function () {
            expect(m.schema.paths[field].instance).toBe('Number');
        });
    });

    [
        'feed_publisher_name',
        'feed_publisher_url',
        'feed_lang',
    ]
    .forEach(function (field) {
        it(`should require that field ${field} is not empty`, function () {
            expect(m.schema.paths[field].isRequired).toBe(true);
        });
    });

    [
        'feed_start_date',
        'feed_end_date',
        'feed_version',
    ]
    .forEach(function (field) {
        it(`should allow field ${field} to be empty`, function () {
            expect(m.schema.paths[field].isRequired).toBeUndefined();
        });
    });
});
