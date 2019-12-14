const expect = require('chai').expect;

const {reduce, head, tail, reduceC} = require('../../../lesson/lesson-3-reduce-plus/reduce')

describe('lesson', function() {
    describe('lesson-3', function() {
        describe('reduce', function () {
            it('should have a unary function head', function () {
                expect(head).to.be.a('function');
                expect(head.length).to.equal(1);
                expect(head([1,2,3])).to.equal(1);
            })

            it('should have a unary function tail', function () {
                expect(tail).to.be.a('function');
                expect(tail.length).to.equal(1);
                expect(tail([1,2,3])).to.include.ordered.members([2,3]);
            })

            it('should have a ternary function reduce', function () {
                expect(reduce).to.be.a('function');
                expect(reduce.length).to.equal(3);
            })

            it('reduce::should reduce an array of numbers by summing them', function () {
                const add = (agg, x) => agg + x ;

                const xs = [1,2,3,4] ;
                expect( reduce(add, 0, xs) ).to.equal(10) ;
                expect( reduce(add, 1, xs) ).to.equal(11) ;
            })

            it('reduce::should reduce an array of numbers by multiplying them', function () {
                const multiply = (agg, x) => agg * x ;

                const xs = [1,2,3,4] ;
                expect( reduce(multiply, 0, xs) ).to.equal(0) ;
                expect( reduce(multiply, 1, xs) ).to.equal(24) ;
            })

            it('reduceC::should reduce an array of numbers by summing them', function () {
                expect(reduceC).to.be.a('function');

                const add = (agg, x) => agg + x ;

                const sumArray = reduceC(add, 0) ;
                expect(sumArray).to.be.a('function');

                const xs = [1,2,3,4] ;
                expect( sumArray(xs) ).to.equal(10) ;
            })

        })


    })
});