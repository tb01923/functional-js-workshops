// poached from ramda source and doctored to see what I was missing..

const {map, curryN} = require('Ramda')

var prop = curryN(2, function prop(p, obj){
    return obj[p] ;
});

var assoc = curryN(3, function assoc(prop, val, obj) {
    var result = {};
    for (var p in obj) {
        result[p] = obj[p];
    }
    result[prop] = val;
    return result;
});

var lens = function lens(getter, setter) {
    return function (toFunctorFn) {
        return function (target) {
            return map(
                function (focus) {
                    return setter(focus, target);
                },
                toFunctorFn(getter(target))
            );
        };
    };
};

var lensProp = function lensProp(k) {
    return lens(prop(k), assoc(k));
};


var Identity = function (x) {
    return { value: x, map: function (f) {
            return Identity(f(x));
        } };
};

var over = function over(lens, f, x) {
    // The value returned by the getter function is first transformed with `f`,
    // then set as the value of an `Identity`. This is then mapped over with the
    // setter function of the lens.
    return lens(function (y) {
        return Identity(f(y));
    })(x).value;
};


const double = x => x + x
const xyObj = {x: 10, y: 11}
const xlens = lensProp('x')
const xyObj2 = over(xlens, double, xyObj)
const ten = 10;