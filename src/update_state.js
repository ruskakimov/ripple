function euclidDistance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

function updateState(state, ms_elapsed, pixels_per_second, max_x, max_y) {
    if (state.ripples) {
        state.ripples = state.ripples.map(function (ripple) {
            ripple.radius += ms_elapsed / 1000 * pixels_per_second;
            return ripple;
        });
        state.ripples = state.ripples.filter(function (ripple) {
            return euclidDistance(0, 0, ripple.x, ripple.y) >= ripple.radius
                || euclidDistance(max_x, 0, ripple.x, ripple.y) >= ripple.radius
                || euclidDistance(0, max_y, ripple.x, ripple.y) >= ripple.radius
                || euclidDistance(max_x, max_y, ripple.x, ripple.y) >= ripple.radius;
        });
    }
}

module.exports = updateState;