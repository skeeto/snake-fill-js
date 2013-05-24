function Map(width, height) {
    this.width = width;
    this.height = height;
    this.grid = {};
}

Map.prototype.isFilled = function(point, set) {
    if (set != null) {
        return this.grid[point] = set;
    } else {
        return point.x < 0 || point.y < 0 ||
            point.x >= this.width || point.y >= this.height ||
            Boolean(this.grid[point]);
    }
};

Map.parse = function(input) {
    var lines = input.split(/\n/);
    var dimensions = lines[0].split(/ +/).map(parseFloat);
    var map = new Map(dimensions[0], dimensions[1]);
    lines.slice(2).map(function(line) {
        var point = P.apply(null, line.split(/ +/).map(parseFloat));
        map.isFilled(point, true);
    });
    return map;
};

Map.prototype.isReachable = function(a, b) {
    var visited = {};
    var queue = a.neighbors();
    while (queue.length > 0) {
        var next = queue.shift();
        if (next.equals(b)) {
            return true;
        } else if (!this.isFilled(next) && !visited[next]) {
            visited[next] = true;
            queue.push.apply(queue, next.neighbors());
        }
    }
    return false;
};

Map.prototype.longest = function(start, target) {
    if (target.equals(start)) return [start];
    if (!this.isReachable(start, target)) return null;

    this.isFilled(start, true);
    var neighbors = start.neighbors().sort(function(a, b) {
        return b.minus(target).norm1() - a.minus(target).norm1();
    });
    for (var i = 0; i < neighbors.length; i++) {
        if (!this.isFilled(neighbors[i])) {
            var result = this.longest(neighbors[i], target);
            if (result) {
                this.isFilled(start, false);
                result.push(start);
                return result;
            }
        }
    }
    this.isFilled(start, false);
    return null;
};

Map.prototype.fill = function() {
    var best = [];
    for (var y = this.height - 1; y >= 0; y--) {
        for (var x = this.width - 1; x >= 0; x--) {
            var point = P(x, y);
            if (!this.isFilled(point)) {
                var path = this.longest(Point.ORIGIN, point);
                if (path && path.length > best.length) best = path;
            }
        }
    }
    return best;
};
