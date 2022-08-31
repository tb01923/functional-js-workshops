const Additive = function(v) {
    this.v = v
}

Additive.empty = () => new Additive(0)

Additive.prototype.concat = function(other) {
    return new Additive(this.v + other.v)
}
Additive.prototype.extract = function() {
    return this.v
}

module.exports = Object.freeze({Additive})