
import { formatDate, getData } from '../js/utils.js';


describe("Utils", function() {

    describe("formatDate function", function() {

        it("should exist", function() {
            expect(formatDate).toBeDefined();
        });
        
        it("should return '2019-05-09'", function() {
            var dateToFormat = new Date('2019-05-09');
            expect(formatDate(dateToFormat)).toBe('2019-05-09');
        });

        it("should return '2019-05-19'", function() {
            var dateToFormat = new Date('2019-05-19');
            expect(formatDate(dateToFormat)).toBe('2019-05-19');
        });

        it("should return '2019-11-09'", function() {
            var dateToFormat = new Date('2019-11-09T05:05:00');
            expect(formatDate(dateToFormat)).toBe('2019-11-09');
        });

        it("should return '2019-11-19'", function() {
            var dateToFormat = new Date('2019-11-19T05:05:00');
            expect(formatDate(dateToFormat)).toBe('2019-11-19');
        });
    });
    
    
    describe("getData function", function() {
        
        it("should exist", function() {
            expect(getData).toBeDefined();
        });
        
        it("API call returns JSON file with keys 'base' and rates'", function() {
            var url = 'https://api.exchangeratesapi.io/latest?';
            return getData(url).then(function(data) {
                expect(Object.keys(data).includes('base')).toBe(true);
                expect(Object.keys(data).includes('rates')).toBe(true);
            });
        });
    });

});  
