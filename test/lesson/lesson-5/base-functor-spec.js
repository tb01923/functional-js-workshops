const chai = require('chai') ;
const expect = chai.expect;

const {map, extract} = require('fantasy-land');
const {identity, composition} = require('fantasy-land/laws/functor');

const { isEqualTo, extractFrom, Identity, Const, getInstance } = require('../../../lesson/lesson-5-functors/base-functors') ;

const K = x = _ => x
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
        describe('base-functors', function () {

            //set up and assertot fantasy-land specifcation
            const SomeExtractable = function(x){
                const self = getInstance(this, SomeExtractable)
                self[extract] = () => x
                return Object.freeze(self)
            }

            it('mock should support fantasy-land/extract spec', function () {
                expect(SomeExtractable()).to.be.a('object').to.have.property(extract).to.be.a('function').of.length(0);
            })

            describe('extractFrom', function () {
                it('extractFrom should support fantasy-land/extract spec', function () {
                    expect(extractFrom(SomeExtractable(10))).to.be.equal(10)
                })
            })
            describe('isEqualTo', function () {
                it('isEqualTo should support traditional equality', function () {
                    expect(isEqualTo(SomeExtractable(10), SomeExtractable(10))).to.be.equal(true);
                    expect(isEqualTo(SomeExtractable(10), SomeExtractable(15))).to.be.equal(false);
                })
            })
            describe('Const Functor', function () {
                it('Const(10) should pass the Identity law', function () {
                    expect(identity(Const)(isEqualTo)(5)).to.be.equal(true) ;
                })
                it('Const(10) should pass the Composition law', function () {
                    expect(composition(Const)(isEqualTo)(double)(square)(5)).to.be.equal(true) ;
                })
                it('Const(5).map(x => x + 5) should equal Const(5)', function () {
                    const const5 = Const(5)[map](add5) ;
                    expect(const5).to.be.an.extractableFunctor(Const(5)) ;
                })
            })
            describe('Identity Functor', function () {
                it('Identity(10) should pass the Identity law', function () {
                    expect(identity(Identity)(isEqualTo)(5)).to.be.equal(true) ;
                })
                it('Identity(10) should pass the Composition law', function () {
                    expect(composition(Identity)(isEqualTo)(double)(square)(5)).to.be.equal(true) ;
                })
                it('Identity(5).map(x => x + 5) should equal Const(5)', function () {
                    const identity5 = Identity(5)[map](add5) ;
                    expect(identity5).to.be.an.extractableFunctor(Identity(10)) ;
                })
            })
        })
    })
})