var stretch = require('stretch-canvas').stretch;
var unstretchCoordinates = require('stretch-canvas').unstretchCoordinates;
var updateState = require('./update_state');
var paintFrame = require('./paint_frame');

var canvas = document.getElementById('ripple-canvas');
var ctx = canvas.getContext('2d');

var original_width = 100;
var original_height = 100;

canvas.width = original_width;
canvas.height = original_height;

stretch(canvas);

var pixels_per_second = 25;
var state = {
    ripples: [
        {
            x: 50,
            y: 50,
            radius: 0,
            color: '#f00',
        }
    ]
};
var last_timestamp = null;

function mainCycle(timestamp) {
    var ms_elapsed = last_timestamp ? (timestamp - last_timestamp) : 0;
    last_timestamp = timestamp;

    updateState(state, ms_elapsed, pixels_per_second, original_width, original_height);
    paintFrame(ctx, state);
    window.requestAnimationFrame(mainCycle);
}

window.requestAnimationFrame(mainCycle);

canvas.addEventListener('click', function(e) {
    console.log(e);
    console.log(e.offsetX, e.offsetY);
    console.log(unstretchCoordinates(e.offsetX, e.offsetY));
});