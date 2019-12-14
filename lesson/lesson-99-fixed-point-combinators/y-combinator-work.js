// U combinator - self application (applies a funciton to itself)
// λg.(g g)
const U = g => g(g) ;

// Y(F) = F(λ x.(Y(F))(x))
const YU = le => f =>
    U(f)(
        f => le( x => U(f)(x) )
    ) ;

const factAlgoIter = iterator => n =>
    (n < 2) ?
        1 :
        n * iterator(n-1) ;

var makeRealFactStraight = function(factAlgoIter) {

    // getNextTryFact us a function which is passed a copy of itself
    //      getNextTryFactRef so that we can "recurse"
    var getNextTryFact = getNextTryFactRef =>
        // work is done here
        factAlgoIter(
            x => getNextTryFactRef(getNextTryFactRef)(x)
        )

    // pass the getNextTryFact into anonymous f to get reference to self apply
    //  return U(getNextTryFact)
    return (getNextTryFactRef => getNextTryFactRef(getNextTryFactRef))(getNextTryFact);
};

var makeRealFact = factAlgoIter =>
    (
        getNextTryFactRef => getNextTryFactRef(getNextTryFactRef)
    )(
        getNextTryFactRef =>
            factAlgoIter(
                x => getNextTryFactRef(getNextTryFactRef)(x)
            )
    )

// U combinator - self application (applies a funciton to itself)
// λg.(g g)
const U = g => g(g) ;

// Y(F) = F(λ x.(Y(F))(x))
const YU = le => f =>
    U(f)(
        f => le( x => U(f)(x) )
    ) ;

var y = le /* the algo */ =>
    (
        // U Combinator Bit, the resultant function is
        f => f(f)
    )(  // pass into U Combinator bit an anonymous function
        //  that provides the next iteration in the algo
        //  Once invoked, f is a reference to itself
        f =>
            // invoke the algo, and then setup next iteration
            //  need to partially apply the next iterator to le
            //  when invoked from le it provides te input x to the
            //  next iteration of le
            le(
                x => f(f)(x)
            )
    )

const factAlgo = y(f /* applied t le in the y combinator [x => f(f)(x)]*/ =>
    n =>
        (n < 2) ?
            1 :
            n * f(n-1)) ;

const factAlgoY3 = makeRealFactStraight(factAlgoIter)
const factAlgoY2 = makeRealFact(factAlgoIter)
const factAlgoY = y(factAlgoIter)

console.log(factAlgoY3(3), factAlgoY2(3), factAlgoY(3), factAlgo(3))