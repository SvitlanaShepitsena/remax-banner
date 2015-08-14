'use strict';

var id;
//    ? path to your project
FamousFramework.component('svitlana:remax-banner', {
    behaviors: {
        '#root': {
            'style': {
                'perspective': '1000px'
            }
        },
        '#rotator-node': {
            'align': [0.12, 0.12],
            'mount-point': [0, 0],
            'origin': [0.5, 0.5],
            'position-z': function (rootZ) {
                return rootZ;
            },
            'size': function (windowWidth, windowHeight) {
                return [windowWidth * .85, windowHeight];
            },
            'rotation': function (rotationValue) {
                return [-Math.PI / 2, 0, rotationValue];
            }
        },
        '.gallery-item': {
            'size': [160, 160],
            'style': {
                'cursor': 'pointer'
            },
            '$repeat': function (srcs) {
                return srcs;
            },
            'position-x': function ($index, windowHeight, windowWidth) {
                return $index * 130;
            },
            'position-y': function ($index, windowHeight) {
                return Math.random() * windowHeight;
            },
            'position-z': function ($index, positionZ) {
                return positionZ[$index];
            },
            'rotation': [Math.PI / 2, 0, 0],
            'src': function ($index, srcs) {
                return srcs[$index];
            },
            'index': function ($index) {
                return $index;
            }
        }
    },
    events: {
        '$lifecycle': {
            'post-load': function ($state, $famousNode) {
                id = $famousNode.addComponent({
                    onUpdate: function (time) {
                        for (var i = 0; i < $state.get('srcs').length; i++) {
                            var currentZ = $state.get(['positionZ', i]);
                            // if image is out of screen move it back to bottom
                            if (currentZ < -1.2 * $state.get('windowHeight')) {
                                currentZ = $state.get('windowHeight') / 1.5 + 100;
                            }
                            $state.set(['positionZ', i], currentZ - 1);
                        }
                        var animationStopped = $state.get('isAnimationStopped');
                        if (!animationStopped) {
                            $famousNode.requestUpdateOnNextTick(id);
                        }
                    }
                });
                $famousNode.requestUpdateOnNextTick(id);
            }
        },
        '.gallery-item': {
            'click': function ($state, $famousNode, $dispatcher, $repeatPayload, $index) {
                $state.set('rotationValue', $state.get('rotationValue') - Math.PI / 2, {
                    duration: 1000,
                    curve: 'easeIn'
                }).thenSet('rotationValue', $state.get('rotationValue') - Math.PI * 2, {
                    duration: 2000,
                    curve: 'easeOut'
                });
                var animationStopped = $state.get('isAnimationStopped');
                if (animationStopped) {
                    $state.set('isAnimationStopped', 0);
                    $dispatcher.broadcast('house-info-hide', { id: $index });

                    $famousNode.requestUpdateOnNextTick(id);
                } else {
                    $state.set('isAnimationStopped', 1);
                    $dispatcher.broadcast('house-info-show', { id: $index });
                }

                $state.set('rootZ', -500, {
                    duration: 1000,
                    curve: 'easeOut'
                }).thenSet('rootZ', 0, {
                    duration: 2000,
                    curve: 'easeInOut'
                });
            }
        }
    },
    states: {
        isAnimationStopped: 0,
        windowHeight: windowHeight,
        windowWidth: windowWidth,
        rotationValue: 0,
        srcs: imageData,
        positionZ: randomCoordinates(imageData),
        rootZ: 0
    },
    tree: 'tree.html'
}).config({
    includes: ['galleryData.js', 'remax-banner.css'],
    imports: {
        'svitlana:remax-banner': ['header-remax', 'header-content', 'house', 'logo', 'footer-remax', 'slogan']
    }
});