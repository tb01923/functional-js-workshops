const expect = require('chai').expect;

const {transformingAppender, map} = require('../../../lesson/lesson-3-reduce-plus/map')

describe('lesson', function() {
    describe('lesson-3', function() {
        describe('map', function () {
            it('should have a unary function transformingAppender', function () {
                expect(transformingAppender).to.be.a('function');
                expect(transformingAppender.length).to.equal(1);

                // Identity combinator
                const I = x => x

                const append = transformingAppender(I)
                expect(append).to.be.a('function');
                expect(append.length).to.equal(2);

                expect(append([1,2,3], 4)).to.include.ordered.members([1,2,3,4]);

                const double = x => x * 2
                const doubleAndAppend = transformingAppender(double) ;
                expect(doubleAndAppend([1,2,3], 4)).to.include.ordered.members([1,2,3,8]);
            })

            it('should have a unary function map', function () {
                expect(map).to.be.a('function');
                expect(map.length).to.equal(1);

                const double = x => x * 2
                const doubleArray = map(double)
                expect(doubleArray).to.be.a('function');

                expect(doubleArray([1,2,3])).to.include.ordered.members([2,4,6]);
            })

            it('should have a unary function map', function () {

                const double = x => x * 2
                expect(map(double)([1,2,3])).to.include.ordered.members([2,4,6]);
            })

    })
});