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

module.exports = paintFrame;