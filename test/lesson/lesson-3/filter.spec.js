const expect = require('chai').expect;

const {conditionalAppender, filter} = require('../../../lesson/lesson-3-reduce-plus/filter')

describe('lesson', function() {
    describe('lesson-3', function() {
        describe('filter', function () {
            it('should have a unary function conditionalAppender', function () {
                expect(conditionalAppender).to.be.a('function');
                expect(conditionalAppender.length).to.equal(1);

                // constant True predicate
                const T = x => true

                // constant False predicate
                const F = x => false

                const alwaysAppend = conditionalAppender(T)
                expect(alwaysAppend).to.be.a('function');
                expect(alwaysAppend.length).to.equal(2);
                expect(alwaysAppend([1,2,3], 4)).to.include.ordered.members([1,2,3,4]);

                const neverAppend = conditionalAppender(F)
                expect(neverAppend).to.be.a('function');
                expect(neverAppend.length).to.equal(2);
                expect(neverAppend([1,2,3], 4)).to.include.ordered.members([1,2,3]);

                // the previous two test make this case optional/extraß
                const isEven = x => x % 2 == 0
                const appendEven = conditionalAppender(isEven)
                expect(appendEven([1,2,3], 4)).to.include.ordered.members([1,2,3,4]);
                expect(appendEven([1,2,3], 5)).to.include.ordered.members([1,2,3]);
            })

            it('should have a unary function filter', function () {
                expect(filter).to.be.a('function');
                expect(filter.length).to.equal(1);

                const isEven = x => x % 2 == 0
                const onlyEvens = filter(isEven)
                expect(onlyEvens).to.be.a('function');

                expect(onlyEvens([1,2,3,4,12])).to.include.ordered.members([2,4,12]);
                expect(onlyEvens([1,2,3,4,12])).to.not.include.ordered.members([1,3]);
            })

        })


    })
});