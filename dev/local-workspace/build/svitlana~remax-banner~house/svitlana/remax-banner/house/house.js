'use strict';

FamousFramework.component('svitlana:remax-banner:house', {
    behaviors: {
        '#house': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5]
        },
        'img': {
            'size': [30, 30],
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'src': '[[identity|src]]'
        }

    },
    events: {
        '$public': {
            'src': '[[setter|src]]'
        }
    },
    states: {
        imgSrc: null
    },
    tree: '<node id="house">\n    <img>\n    </node>'
});