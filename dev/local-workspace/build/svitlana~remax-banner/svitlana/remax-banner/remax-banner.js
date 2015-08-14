//    ? path to your project
'use strict';

FamousFramework.component('svitlana:remax-banner', {
    behaviors: {
        '#root': {
            'style': {
                'perspective': '1000px'
            }
        },
        '#logo': {
            'align': [0.1, 0.1],
            'mount-point': [0.1, 0.1],
            'origin': [0.1, 0.1]
        },

        '#footerRemax': {
            'align': [0.5, 1],
            'origin': [0.5, 1],
            'mount-point': [0.5, 1],
            'size': [undefined, 100]

        },
        '#rotator-node': {
            'position-z': function (rootZ) {
                return rootZ;
            },
            'size': function (windowHeight) {
                return [windowHeight, windowHeight];
            },
            'align': [0.12, 0.12],
            'mount-point': [0, 0],
            'origin': [0.5, 0.5],
            'rotation': function (rotationValue) {
                return [-Math.PI / 2.1, 0, rotationValue];
            },
            'style': {
                'backgroundColor': 'red'
            }
        },
        '.gallery-item': {

            '$repeat': function (srcs) {
                return srcs;
            },
            'position-x': function ($index, windowHeight, windowWidth) {
                console.log(windowWidth);
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
            }
        }
    },
    events: {
        '$lifecycle': {
            'post-load': function ($state, $famousNode) {
                var id = $famousNode.addComponent({
                    onUpdate: function (time) {
                        for (var i = 0; i < $state.get('srcs').length; i++) {
                            var currentZ = $state.get(['positionZ', i]);
                            // if image is out of screen move it back to bottom
                            if (currentZ < -1.2 * $state.get('windowHeight')) {
                                currentZ = $state.get('windowHeight') / 1.5 + 100;
                            }
                            $state.set(['positionZ', i], currentZ - 1);
                        }
                        $famousNode.requestUpdateOnNextTick(id);
                    }
                });
                $famousNode.requestUpdateOnNextTick(id);
            }
        },
        '.gallery-item': {
            'click': function ($state) {
                $state.set('rotationValue', $state.get('rotationValue') - Math.PI / 2, {
                    duration: 1000,
                    curve: 'easeIn'
                }).thenSet('rotationValue', $state.get('rotationValue') - Math.PI * 2, {
                    duration: 2000,
                    curve: 'easeOut'
                });

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
        'svitlana:remax-banner': ['house', 'logo', 'footer-remax']
    }
});