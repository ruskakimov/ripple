var stretch = require('stretch-canvas').stretch;
var unstretchCoordinates = require('stretch-canvas').unstretchCoordinates;
var randomColor = require('randomcolor');
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
    ripples: []
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

function addRipple(state, x, y) {
    state.ripples.push({
        x: x,
        y: y,
        radius: 0,
        color: randomColor(),
    });
}

function handleClick(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var coord = unstretchCoordinates(x, y);
    addRipple(state, coord[0], coord[1]);
}

canvas.addEventListener('click', handleClick);