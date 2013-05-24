var display = null, map = null;
window.addEventListener('load', function() {
    var canvas = document.getElementById('display');
    display = new Display(canvas.getContext('2d'));
    map = Map.parse('10 10\n5\n3 0\n3 1\n3 2\n4 1\n5 1');
    display.clear(map);
    display.path(map.fill());

    canvas.addEventListener('click', function(event) {
        if (event.offsetX == null) {
            event.offsetX = event.clientX - canvas.offsetLeft;
            event.offsetY = event.clientY - canvas.offsetTop;
        }
        var p = display.click(event.offsetX, event.offsetY);
        map.isFilled(p, !map.isFilled(p));
        display.clear(map);
        setTimeout(function() {
            display.path(map.fill());
        }, 0);
    });
});
