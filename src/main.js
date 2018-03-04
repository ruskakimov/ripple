var stretch = require('stretch-canvas');
var canvas = document.getElementById('ripple-canvas');
var ctx = canvas.getContext('2d');

canvas.width = 100;
canvas.height = 100;

stretch(canvas);

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


paintFrame(ctx, state);
