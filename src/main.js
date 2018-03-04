var stretch = require('stretch-canvas');
var updateState = require('./update_state');
var paintFrame = require('./paint_frame');

var canvas = document.getElementById('ripple-canvas');
var ctx = canvas.getContext('2d');

var originalWidth = 100;
var originalHeight = 100;

canvas.width = originalWidth;
canvas.height = originalHeight;

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

    updateState(state, ms_elapsed, pixels_per_second, originalWidth, originalHeight);
    paintFrame(ctx, state);
    window.requestAnimationFrame(mainCycle);
}

window.requestAnimationFrame(mainCycle);