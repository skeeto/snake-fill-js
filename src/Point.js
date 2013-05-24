function Point(x, y) {
    this.x = x;
    this.y = y;
}

function P(x, y) { return new Point(x, y); } // shorthand

Point.ORIGIN = P(0, 0);
Point.DIRECTIONS = [P(0, 1), P(1, 0), P(-1, 0), P(0, -1)];

Point.prototype.plus = function(point) {
    return P(this.x + point.x, this.y + point.y);
};

Point.prototype.minus = function(point) {
    return P(this.x - point.x, this.y - point.y);
};

Point.prototype.times = function(scalar) {
    return P(this.x * scalar, this.y * scalar);
};

Point.prototype.norm1 = function() {
    return Math.abs(this.x) + Math.abs(this.y);
};

Point.prototype.equals = function(point) {
    return this.x === point.x && this.y === point.y;
};

Point.prototype.neighbors = function() {
    var _this = this;
    return Point.DIRECTIONS.map(function(p) { return p.plus(_this); });
};

Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
};
