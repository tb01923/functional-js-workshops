const expect = require('chai').expect;

const {add2, curry} = require('../../../lesson/lesson-2-curry/curry')

describe('lesson', function() {
    describe('lesson-2', function() {
        describe('curry', function () {

            it('should have a binary function add2', function () {
                expect(add2).to.be.a('function');
                expect(add2.length).to.equal(2);
                expect(add2(3)).to.be.NaN;
                expect(add2(3, 2)).to.be.equal(5);
                expect(add2(-3, 2)).to.be.equal(-1);

                // ignore over supplied arguments
                expect(add2(-3, 2, 99)).to.be.equal(-1);
            })

            it('should have a unary function curry', function () {
                expect(curry).to.be.a('function');
                expect(curry.length).to.equal(1);

                const curriedAdd2 = curry(add2) ;

                expect(curriedAdd2).to.be.a('function');
                // cannot test arity, as implementation leverages variadic input
                // expect(curriedAdd2.length).to.equal(1);

                const increment = curriedAdd2(1)
                expect(increment).to.be.a('function');
                // cannot test arity, as implementation leverages variadic input
                // expect(increment.length).to.equal(1);
                expect(increment(3)).to.be.equal(4);
            })

        })
    })
});