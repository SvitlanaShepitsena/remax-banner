var id;
//    ? path to your project
FamousFramework.component('svitlana:remax-banner', {
    behaviors: {
        '#root': {
            'style': {
                'perspective': '1000px',
            }
        },
        '#rotator-node': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'position-x': '-50',
            'position-z': function (rootZ) {
                return rootZ
            },
            'size': function (windowWidth, windowHeight) {
                return [windowWidth * .85, windowHeight]
            },
            'rotation': function (rotationValue) {
                return [-Math.PI / 2, 0, rotationValue]
            },

        },
        '.gallery-item': {
            'size': [100, 100],
            'style': {
                'cursor': 'pointer',
            },
            '$repeat': function (srcs) {
                return srcs
            },
            'position-x': function ($index, windowHeight, windowWidth) {
                return -138 + $index * 119;
            },
            'position-y': function ($index, windowHeight) {
                return Math.random() * 100;
            },
            'position-z': function ($index, positionZ) {
                return positionZ[$index]
            },
            'rotation': [Math.PI / 2, 0, 0],
            'src': function ($index, srcs) {
                return srcs[$index];
            },
            'index': function ($index) {
                return $index;
            },
        }
    },
    events: {
        '$lifecycle': {
            'post-load': function ($state, $famousNode, $dispatcher) {
                var currentZ, topTouched = false;
                id = $famousNode.addComponent({
                    onUpdate: function (time) {
                        for (var i = 0; i < $state.get('srcs').length; i++) {
                            currentZ = $state.get(['positionZ', i]);
                            if (currentZ < -80) {
                                topTouched = true;
                                break;
                            }

                            // if image is out of screen move it back to bottom
                            if (currentZ < -1.2 * $state.get('windowHeight')) {
                                currentZ = $state.get('windowHeight') / 1.5 + 100;
                            }
                            $state.set(['positionZ', i], currentZ - 1);
                        }
                        //var animationStopped = $state.get('isAnimationStopped');
                        if (topTouched) {

                            $state.set('rootZ', -500, {
                                duration: 1000,
                                curve: 'easeOut'
                            }).thenSet('rootZ', 0, {
                                duration: 2000,
                                curve: 'easeInOut'
                            });

                            $state.set('rotationValue', $state.get('rotationValue') - Math.PI / 2, {
                                duration: 1000,
                                curve: 'easeIn',
                            }).thenSet('rotationValue', $state.get('rotationValue') - (Math.PI * 2), {
                                duration: 2000,
                                curve: 'easeOut',
                            });

                            $dispatcher.broadcast('house-info-show');
                        } else {
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
                    curve: 'easeIn',
                }).thenSet('rotationValue', $state.get('rotationValue') - (Math.PI * 2), {
                    duration: 2000,
                    curve: 'easeOut',
                });
                var animationStopped = $state.get('isAnimationStopped');
                if (animationStopped) {
                    $state.set('isAnimationStopped', 0);
                    $dispatcher.broadcast('house-info-hide', {id: $index});

                    $famousNode.requestUpdateOnNextTick(id);
                } else {
                    $state.set('isAnimationStopped', 1);
                    $dispatcher.broadcast('house-info-show', {id: $index});

                }


            }
        }
    },
    states: {
        isAnimationStopped: 0,
        windowHeight: 260,
        windowWidth: windowWidth,
        rotationValue: 0,
        srcs: imageData,
        positionZ: randomCoordinates(imageData),
        rootZ: 0
    },
    tree: 'tree.html'
}).config({
    includes: [
        'galleryData.js',
        'remax-banner.css'
    ],
    imports: {
        'svitlana:remax-banner': ['header-remax', 'house', 'logo', 'footer-remax']
    }
});