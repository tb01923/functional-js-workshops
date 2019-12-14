const expect = require('chai').expect;

const {leftToRightComposition, rightToLeftComposition, pipe, compose} = require('../../../lesson/lesson-3-reduce-plus/pipe')

describe('lesson', function() {
    describe('lesson-3', function() {
        describe('pipe', function () {
            it('should have a binary function leftToRightComposition', function () {
                expect(leftToRightComposition).to.be.a('function');
                expect(leftToRightComposition.length).to.equal(2);

                // Identity combinator
                const I = x => x ;

                // apply identity twice
                const justI = leftToRightComposition(I,I) ;
                expect(justI).to.be.a('function');
                expect(justI(10)).to.equal(10) ;

                // apply identity twice and then two more times
                const justII = leftToRightComposition(justI, justI) ;
                expect(justII).to.be.a('function');
                expect(justII(10)).to.equal(10) ;

                const increment = x => x +1 ;
                const double = x => x * 2 ;
                const incrementAndDouble = leftToRightComposition(increment, double) ;

                expect(incrementAndDouble(10)).to.equal(22) ;
            })

            it('should have a unary function pipe', function () {
                expect(pipe).to.be.a('function');

                // Identity combinator
                const I = x => x ;

                const longWayToI = pipe([
                    I,
                    I,
                    I
                ]) ;

                expect(longWayToI(10)).to.equal(10) ;

                const increment = x => x +1 ;
                const double = x => x * 2 ;

                const incrementAndDoubleAndDouble = pipe([
                    increment,
                    double,
                    double
                ]) ;

                expect(incrementAndDoubleAndDouble(10)).to.equal(44) ;

                const doubleAndDoubleAndIncrement = pipe([
                    double,
                    double,
                    increment
                ]) ;

                expect(doubleAndDoubleAndIncrement(10)).to.equal(41) ;
            })

            it('should have a binary function rightToLeftComposition', function () {
                expect(rightToLeftComposition).to.be.a('function');
                expect(rightToLeftComposition.length).to.equal(2);


                const increment = x => x +1 ;
                const double = x => x * 2 ;
                const incrementAndDouble = rightToLeftComposition(increment, double) ;

                expect(incrementAndDouble(10)).to.equal(21) ;
            })

            it('should have a unary function compose', function() {
                expect(compose).to.be.a('function');

                const increment = x => x +1 ;
                const double = x => x * 2 ;

                const doubleAndDoubleAndIncrement = compose([
                    increment,
                    double,
                    double
                ]) ;

                expect(doubleAndDoubleAndIncrement(10)).to.equal(41) ;

                const incrementAndDoubleAndDouble  = compose([
                    double,
                    double,
                    increment
                ]) ;

                expect(incrementAndDoubleAndDouble(10)).to.equal(44) ;
            })
        })
    })
});