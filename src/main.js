var stretch = require('stretch-canvas');
var canvas = document.getElementById('ripple-canvas');
var ctx = canvas.getContext('2d');

canvas.width = 100;
canvas.height = 100;

stretch(canvas);

var pixels_per_second = 30;
var state = {
    ripples: [
        {
            x: 50,
            y: 50,
            radius: 10,
            color: '#f00',
        }
    ]
};
var last_timestamp = null;

function updateState(state, ms_elapsed, pixels_per_second) {
    if (state.ripples) {
        state.ripples = state.ripples.map(function (ripple) {
            ripple.radius += ms_elapsed / 1000 * pixels_per_second;
        });
        // TODO: filter out not visible ripples
    }
}

function paintFrame(ctx, state) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (state.ripples) {
        state.ripples.forEach(function (ripple) {
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
            ctx.strokeStyle = ripple.color;
            ctx.stroke();
        });
    }
}

function mainCycle(timestamp) {
    var ms_elapsed = last_timestamp ? (timestamp - last_timestamp) : 0;
    last_timestamp = timestamp;

    updateState(state, ms_elapsed, pixels_per_second);
    paintFrame(ctx, state);
    window.requestAnimationFrame(mainCycle);
}

window.requestAnimationFrame(mainCycle);