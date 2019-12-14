const expect = require('chai').expect;

const {add2, papply, increment} = require('../../../lesson/lesson-2-curry/papply')

describe('lesson', function() {
    describe('lesson-2', function() {
        describe('papply', function () {

            it('should have a binary function add2', function () {
                expect(add2).to.be.a('function');
                expect(add2.length).to.equal(2);
                expect(add2(3)).to.be.NaN;
                expect(add2(3, 2)).to.be.equal(5);
                expect(add2(-3, 2)).to.be.equal(-1);
            })

            it('should have a binary function papply', function () {
                expect(papply).to.be.a('function');
                expect(papply.length).to.equal(2);

                // K combinator
                const K = (x1,x2) => x1 ;

                // apply 1 t K combinator creating a constant function for 1
                const one = papply(K, 1)

                expect(one).to.be.a('function');
                expect(one.length).to.equal(1);
                expect(one(2)).to.equal(1) ;
            })

            it('should have a unary function increment', function () {
                expect(increment).to.be.a('function');
                expect(increment.length).to.equal(1);
                expect(increment(3)).to.be.equal(4);

                // over supply arguments, last ones should be ignored
                expect(increment(3, 4)).to.be.equal(4);
            })

        })
    })
});