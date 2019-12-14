// U combinator - self application (applies a funciton to itself)
// λg.(g g)
const U = g => g(g) ;

// Y(F) = F(λ x.(Y(F))(x))
const YU = le => f =>
    U(f)(
        f => le( x => U(f)(x) )
    ) ;

// Y(F) = F(λ x.(Y(F))(x))
var Y = le  =>
    (
        f => f(f)
    )(
        g => le( x => g(g)(x) )
    )

const factAlgo = Y(
    f =>
        x =>
            (x < 2) ?
                1 :
                x * f(x - 1)
) ;

console.log(factAlgo(3))