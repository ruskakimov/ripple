(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
(function() {

function stretch(canvas, config) {
    config = config || {};
    config.center = config.center === undefined ? true : config.center;
    config.maxWidth = config.maxWidth || window.innerWidth;

    var originalWidth = canvas.width,
        originalHeight = canvas.height,
        dpr = window.devicePixelRatio || 1;

    // full height
    var newHeight = window.innerHeight,
        newWidth = newHeight * originalWidth / originalHeight;

    if (newWidth > window.innerWidth || newWidth > config.maxWidth) {
        // go with full width instead
        newWidth = Math.min(window.innerWidth, config.maxWidth);
        newHeight = newWidth * originalHeight / originalWidth;
    }

    canvas.width = newWidth * dpr;
    canvas.height = newHeight * dpr;

    canvas.style.width = newWidth + 'px';
    canvas.style.height = newHeight + 'px';

    var ctx = canvas.getContext('2d');
    ctx.scale(canvas.width / originalWidth, canvas.height / originalHeight);

    if (config.center) center(canvas);
}

function center(canvas) {
    var styles = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    Object.keys(styles).forEach(function(prop) {
        canvas.style[prop] = styles[prop];
    });
}

if (typeof module === 'object') {
    module.exports = stretch;
}
else if (typeof window === 'object') {
    window.stretch = stretch;
}

})();
},{}],2:[function(require,module,exports){
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

},{"stretch-canvas":1}]},{},[2]);
