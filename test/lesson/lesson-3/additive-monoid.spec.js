const expect = require('chai').expect;

const { Additive, mconcat } = require('../../../lesson/lesson-3-reduce-plus/additive-monoid')
const { map } = require('../../../lesson/lesson-3-reduce-plus/map')
const { pipe } = require('../../../lesson/lesson-3-reduce-plus/pipe')


describe('lesson', function() {
    describe('lesson-3', function() {
        describe('additive-monoid', function () {
            it('should have a Monoid Type of Additive', function () {
                expect(Additive).to.be.a('function');

                const a = Additive(10)

                expect(a.concat).to.be.a('function');
                expect(a.getValue).to.be.a('function');
                expect(a.toString).to.be.a('function');
            })
            it('should have a Additive.getValue that extracts the value boxed by the Additive', function () {
                const a = Additive(10) ;
                expect(a.getValue()).to.equal(10) ;
            })
            it('should have a Additive.concat that adds Additives', function () {
                expect(Additive).to.be.a('function');

                const a = Additive(10) ;
                const b = new Additive(10) ;
                const c = a.concat(b)

                // Make sure the return value is an additive
                expect(c.concat).to.be.a('function');
                expect(c.getValue).to.be.a('function');
                expect(c.toString).to.be.a('function');

                expect(c.getValue()).to.equal(20) ;
            })

            it('should have a unary concat that reduces an Array of Additives using Additive.concat as a combiner ', function () {
                expect(mconcat).to.be.a('function');
                expect(mconcat.length).to.equal(1);

                const a = Additive(10) ;
                const b = Additive(10) ;
                const c = Additive(10) ;

                const d = mconcat([a,b,c])

                // Make sure the return value is an additive
                expect(d.concat).to.be.a('function');
                expect(d.getValue).to.be.a('function');
                expect(d.toString).to.be.a('function');

                expect(d.getValue()).to.equal(30) ;
            })

            it('should map numbers into Additives and then mconcat', function () {

                const sumList = pipe([
                    map(Additive)
                    , mconcat
                ])

                const a = sumList([1,2,3,4,5,6,7,8,9,10])
                expect(a.getValue()).to.equal(55) ;
            })
        })
    })
});