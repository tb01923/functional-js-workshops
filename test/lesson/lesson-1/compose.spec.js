const expect = require('chai').expect;

const {double, square, doubleAndSquare, squareAndDouble} = require('../../../lesson/lesson-1-basic-composition/compose')

describe('lesson', function() {
    describe('lesson-1', function() {
        describe('compose', function () {
            it('should have a unary function double', function () {
                expect(double).to.be.a('function');
                expect(double.length).to.equal(1)
                expect(double(3)).to.be.equal(6);
                expect(double(-3)).to.be.equal(-6);
            })
            it('should have a unary function square', function () {
                expect(square).to.be.a('function');
                expect(square.length).to.equal(1)
                expect(square(3)).to.be.equal(9);
                expect(square(-3)).to.be.equal(9);
            })
            it('should have a unary function doubleAndSquare', function (){
                expect(doubleAndSquare).to.be.a('function');
                expect(doubleAndSquare.length).to.equal(1)
                expect(doubleAndSquare(3)).to.be.equal(36);
                expect(doubleAndSquare(-3)).to.be.equal(36);
            })
            it('should have a unary function squareAndDouble', function (){
                expect(squareAndDouble).to.be.a('function');
                expect(squareAndDouble.length).to.equal(1)
                expect(squareAndDouble(3)).to.be.equal(18);
                expect(squareAndDouble(-3)).to.be.equal(18);
            })
        })
    })
});