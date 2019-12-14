const chai = require('chai') ;
const expect = chai.expect;

const {map} = require('fantasy-land');
const {identity, composition} = require('fantasy-land/laws/functor');

const { Just, Nothing } = require('../../../lesson/lesson-5-functors/maybe-functor') ;
const { isEqualTo, extractFrom } = require('../../../lesson/lesson-5-functors/base-functors') ;

const double = x => x * 2
const square = x => x * x
const add5 = x => x + 5

chai.use((_chai, utils) => {

    const extractableFunctor = function(a) {
        const b = this._obj;
        new chai.Assertion(extractFrom(a)).to.be.equal(extractFrom(b));
    };
    chai.Assertion.addMethod("extractableFunctor", extractableFunctor, extractableFunctor)
})



describe('lesson', function() {
    describe('lesson-5-functors', function() {
        describe('maybe-functor', function () {
            it('Just(10) should pass the Identity law', function () {
                expect(identity(Just)(isEqualTo)(10)).to.be.equal(true) ;
            })
            it('Just(10) should pass the Composition law', function () {
                expect(composition(Just)(isEqualTo)(double)(square)(10)).to.be.equal(true) ;
            })
            it('Nothing should pass the Identity law', function () {
                expect(identity(Nothing)(isEqualTo)(10)).to.be.equal(true) ;
            })
            it('Nothing should pass the Composition law', function () {
                expect(composition(Nothing)(isEqualTo)(double)(square)(10)).to.be.equal(true) ;
            })
            it('Just(10).map(x => x + 5) should equal Just(15)', function () {
                const just15 = Just(10)[map](add5) ;
                expect(just15).to.be.an.extractableFunctor(Just(15)) ;
            })
            it('Nothing().map(x => x + 5) should equal Nothing()', function () {
                const nothing = Nothing()[map](add5) ;
                expect(nothing).to.be.an.extractableFunctor(Nothing()) ;
            })
        })
    })
})