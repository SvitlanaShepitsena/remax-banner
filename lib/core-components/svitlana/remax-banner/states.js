'use strict'
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var states = {
    isAnimationStopped: 0,
    windowHeight: windowHeight,
    windowWidth: windowWidth,
    rotationValue: 0,
    srcs: imageData,
    positionZ: randomCoordinates(imageData),
    rootZ: 0
};