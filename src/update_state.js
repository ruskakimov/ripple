function updateState(state, ms_elapsed, pixels_per_second) {
    if (state.ripples) {
        state.ripples = state.ripples.map(function (ripple) {
            ripple.radius += ms_elapsed / 1000 * pixels_per_second;
            return ripple;
        });
        // state.ripples = state.ripples.filter(function (ripple) {
            // TODO: check if ripple is visible
        // });
    }
}

module.exports = updateState;