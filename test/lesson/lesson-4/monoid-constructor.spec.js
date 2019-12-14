const expect = require('chai').expect;

const {empty, of, concat, extract} = require('fantasy-land');

const { monoidTypeConstructor } = require('../../../lesson/lesson-4-monoids/monoid-constructor') ;
const { mconcat } = require('../../../lesson/lesson-4-monoids/mconcat') ;
const { reduce } = require('../../../lesson/lesson-3-reduce-plus/reduce') ;
const { map } = require('../../../lesson/lesson-3-reduce-plus/map') ;
const { pipe } = require('../../../lesson/lesson-3-reduce-plus/pipe') ;

const add = (a, b) => a + b ;
const Additive  = monoidTypeConstructor(add, 0) ;

describe('lesson', function() {
    describe('lesson-4-monoids', function() {
        describe('monoid-constructor', function () {
            it('should have a Monoid Type of Additive', function () {
                expect(Additive).to.be.a('function');

                const a = Additive(10) ;

                expect(a[concat]).to.be.a('function');
                expect(a[extract]).to.be.a('function');
            })
            it('should have a Additive.extract that extracts the value boxed by the Additive', function () {
                const a = Additive(10) ;
                expect(a[extract]()).to.equal(10) ;
            })
            it('should have a Additive.concat that adds Additives', function () {
                expect(Additive).to.be.a('function');

                const a = Additive(10) ;
                const b = Additive(10) ;
                const c = a[concat](b) ;

                // Make sure the return value is an additive
                expect(c[concat]).to.be.a('function');
                expect(c[extract]).to.be.a('function');

                expect(c[extract]()).to.equal(20) ;
            })

            it('should have a unary concat that reduces an Array of Additives using Additive.concat as a combiner ', function () {
                expect(mconcat).to.be.a('function');
                expect(mconcat.length).to.equal(1);

                const a = Additive(10) ;
                const b = Additive(10) ;
                const c = Additive(10) ;

                const d = mconcat([a,b,c]) ;

                // Make sure the return value is an additive
                expect(d[concat]).to.be.a('function');
                expect(d[extract]).to.be.a('function');

                expect(d[extract]()).to.equal(30) ;
            })

            it('should map numbers into Additives and then mconcat', function () {

                const sumList = pipe([
                    map(Additive)
                    , mconcat
                ]) ;

                const a = sumList([1,2,3,4,5,6,7,8,9,10]) ;
                expect(a[extract]()).to.equal(55) ;
            })

            describe('monoid algebras', function () {

                // algebras / laws
                const {leftIdentity, rightIdentity} = require('fantasy-land/laws/monoid');
                const {associativity} = require('fantasy-land/laws/semigroup');

                const semiGroupLaws = [
                    associativity
                ]

                const monoidLaws = semiGroupLaws.concat([
                    leftIdentity,
                    rightIdentity
                ])

                const extractFrom = x => x[extract]()

                // need to pass equality into each algebra,
                //const eq = (a, b) => a[extract]() === b[extract]() ;
                const eq = (a, b) => extractFrom(a) === extractFrom(b) ;

                const checkLaw = (T, value) => (agg, law) =>
                    agg && law(T)(eq)(value) ;

                const checkLaws = (laws) => (T, value) =>
                    reduce(
                        checkLaw(T, value),
                        true,
                        laws)  ;

                const isMonoid = checkLaws(monoidLaws)

                it('Additive should pass the algebras of a monoid', function () {
                    expect(isMonoid(Additive, 10)).to.equal(true);
                }) ;

                it('Multiplicative should pass the algebras of a monoid', function () {
                    const mult = (a, b) => a * b ;
                    const Multiplicative = monoidTypeConstructor(mult, 1) ;

                    expect(isMonoid(Multiplicative, 10)).to.equal(true);
                }) ;

                it('All should pass the algebras of a monoid', function () {
                    const and = (a, b) => a && b ;
                    const All = monoidTypeConstructor(and, true) ;

                    expect(isMonoid(All, true)).to.equal(true);
                }) ;

                it('Any should pass the algebras of a monoid', function () {
                    const or = (a, b) => a || b ;
                    const Any = monoidTypeConstructor(or, false) ;

                    expect(isMonoid(Any, true)).to.equal(true);
                    expect(isMonoid(Any, false)).to.equal(true);
                }) ;
            })
        })
    })
});