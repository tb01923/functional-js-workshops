const expect = require('chai').expect;

// use non-fantasy-land mconcat
const { mconcat } = require('../../../lesson/lesson-3-reduce-plus/additive-monoid')
const { map } = require('../../../lesson/lesson-3-reduce-plus/map')
const { pipe } = require('../../../lesson/lesson-3-reduce-plus/pipe')

const { Additive } = require('../../../lesson/lesson-4-monoids/additive-1')

describe('lesson', function() {
    describe('lesson-4', function() {
        describe('additive-1', function () {
            it('should have a Monoid Type of Additive', function () {
                expect(Additive).to.be.a('function');

                const a = new Additive(10)

                expect(a.concat).to.be.a('function');
                expect(a.extract).to.be.a('function');
            })
            it('should have a Additive.extract that extracts the value boxed by the Additive', function () {
                const a = new Additive(10) ;
                expect(a.extract()).to.equal(10) ;
            })
            it('should have a Additive.concat that adds Additives', function () {
                expect(Additive).to.be.a('function');

                const a = new Additive(10) ;
                const b = new Additive(10) ;
                const c = a.concat(b)

                // Make sure the return value is an additive
                expect(c.concat).to.be.a('function');
                expect(c.extract).to.be.a('function');

                expect(c.extract()).to.equal(20) ;
            })

            it('should have a unary mconcat that reduces an Array of Additives using Additive.concat as a combiner ', function () {
                expect(mconcat).to.be.a('function');
                expect(mconcat.length).to.equal(1);

                const a = new Additive(10) ;
                const b = new Additive(10) ;
                const c = new Additive(10) ;

                const d = mconcat([a,b,c])

                // Make sure the return value is an additive
                expect(d.concat).to.be.a('function');
                expect(d.extract).to.be.a('function');

                expect(d.extract()).to.equal(30) ;
            })

            it('should map numbers into Additives and then mconcat', function () {

                const sumList = pipe([
                    map(x => new Additive(x))
                    , mconcat
                ])

                const a = sumList([1,2,3,4,5,6,7,8,9,10])
                expect(a.extract()).to.equal(55) ;
            })
        })
    })
});