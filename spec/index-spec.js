// based on https://developers.google.com/transit/gtfs/reference/frequencies-file
const gtfsModels = require('../index');

describe('index', function () {
    it('should have an object property of the mongoose models', function () {
        expect(gtfsModels.models).toEqual(jasmine.any(Object));
        expect(Object.keys(gtfsModels.models).length).toBe(13);
    });

    it('should have a model map to tie a gtfs file name to its model', function () {
        expect(gtfsModels.modelMap).toEqual(jasmine.any(Object));
    });

    it('should be able to return a model for a give file', function () {
        const Agency = gtfsModels.getModelForFile('agency.txt');
        const agency = new Agency();
        expect(agency.$isMongooseModelPrototype).toBe(true);
        expect(agency.constructor.modelName).toBe('Agency');

        const FeedInfo = gtfsModels.getModelForFile('feed_info.txt');
        const feedInfo = new FeedInfo();
        expect(feedInfo.$isMongooseModelPrototype).toBe(true);
        expect(feedInfo.constructor.modelName).toBe('FeedInfo');
    });
});
