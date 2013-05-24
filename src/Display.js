function Display(context) {
    this.context = context;
    this.width = 0;
    this.height = 0;
    this.scale = 0.05;
}

Display.prototype.draw = function(f) {
    var c = this.context, w = c.canvas.width, h = c.canvas.height;
    var scale = this.scale;
    c.save();
    c.translate(w * scale / 2, h * scale / 2);
    c.scale(1 - scale, 1 - scale);
    f();
    c.restore();
};

Display.prototype.clear = function(map) {
    var c = this.context, w = c.canvas.width, h = c.canvas.height;
    c.fillStyle = 'white';
    c.fillRect(0, 0, w, h);
    c.strokeStyle = 'darkgray';
    c.lineWidth = 3;
    if (map) {
        this.width = map.width;
        this.height = map.height;
        this.draw(function() {
            for (var y = 0; y <= map.height; y++) {
                var yy = y * h / map.height;
                c.beginPath();
                c.moveTo(0, yy);
                c.lineTo(w, yy);
                c.stroke();
            }
            for (var x = 0; x <= map.width; x++) {
                var xx = x * w / map.width;
                c.beginPath();
                c.moveTo(xx, 0);
                c.lineTo(xx, h);
                c.stroke();
            }
            c.fillStyle = 'black';
            for (y = 0; y < this.height; y++) {
                for (x = 0; x < this.width; x++) {
                    var p = P(x, y);
                    if (map.isFilled(p)) this.dot(p, 0.4);
                }
            }
            c.fillStyle = 'darkblue';
            this.dot(Point.ORIGIN, 0.4);
        }.bind(this));
    } else {
        this.width = 0;
        this.height = 0;
    }
};

Display.prototype.line = function(a, b) {
    var c = this.context, w = c.canvas.width, h = c.canvas.height;
    var sx = w / this.width, sy = h / this.height;
    c.beginPath();
    c.moveTo((a.x + 0.5) * sx, (a.y + 0.5) * sy);
    c.lineTo((b.x + 0.5) * sx, (b.y + 0.5) * sy);
    c.stroke();
};

Display.prototype.dot = function(p, radius) {
    var c = this.context, w = c.canvas.width, h = c.canvas.height;
    var sx = w / this.width, sy = h / this.height;
    c.beginPath();
    c.arc((p.x + 0.5) * sx, (p.y + 0.5) * sy, sx * radius, 0, Math.PI * 2);
    c.fill();
};

Display.prototype.path = function(path) {
    var c = this.context, w = c.canvas.width, h = c.canvas.height;
    var sx = w / this.width, sy = h / this.height;
    this.context.lineWidth = sx * 0.3;
    this.context.strokeStyle = 'blue';
    this.context.fillStyle = 'blue';
    this.draw(function() {
        for (var i = 0; i < path.length; i++) {
            this.dot(path[i], 0.15);
            if (i > 0) this.line(path[i - 1], path[i]);
        }
    }.bind(this));
};

Display.prototype.click = function(x, y) {
    var c = this.context, w = c.canvas.width, h = c.canvas.height;
    var sx = w / this.width, sy = h / this.height;
    var trans = P(x, y).times(1 / (1 - this.scale))
            .minus(P(w * this.scale / 2, h * this.scale / 2));
    return P(Math.floor(trans.x / sx), Math.floor(trans.y / sy));
};
