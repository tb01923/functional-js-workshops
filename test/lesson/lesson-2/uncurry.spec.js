9const expect = require('chai').expect;

const {curry} = require('../../../lesson/lesson-2-curry/curry')
const {add2, uncurry} = require('../../../lesson/lesson-2-curry/uncurry')

describe('lesson', function() {
    describe('lesson-2', function() {
        describe('uncurry', function () {

            it('should have a binary function add2', function () {
                expect(add2).to.be.a('function');
                expect(add2.length).to.equal(2);
                expect(add2(3)).to.be.NaN;
                expect(add2(3, 2)).to.be.equal(5);
                expect(add2(-3, 2)).to.be.equal(-1);

                // ignore over supplied arguments
                expect(add2(-3, 2, 99)).to.be.equal(-1);
            })

            it('should have a unary function uncurry', function () {
                expect(curry).to.be.a('function');
                expect(curry.length).to.equal(1);

                const curriedAdd2 = curry(add2) ;
                expect(curriedAdd2).to.be.a('function');

                const add2Again = uncurry(add2)
                expect(add2Again).to.be.a('function');
                expect(add2Again.length).to.equal(2);
                expect(add2Again(2,3)).to.equal(5);

            })

        })
    })
});