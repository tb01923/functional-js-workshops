const expect = require('chai').expect;

const {append, arrayCopy} = require('../../../lesson/lesson-3-reduce-plus/array-copy')

describe('lesson', function() {
    describe('lesson-3', function() {
        describe('array-copy', function () {
            it('should have a binary function append', function () {
                expect(append).to.be.a('function');
                expect(append.length).to.equal(2);
                expect(append([1,2,3], 4)).to.include.ordered.members([1,2,3,4]);
            })

            it('should have a unary function arrayCopy', function () {
                expect(arrayCopy).to.be.a('function');
                expect(arrayCopy([1,2,3])).to.include.ordered.members([1,2,3]);
            })

        })


    })
});