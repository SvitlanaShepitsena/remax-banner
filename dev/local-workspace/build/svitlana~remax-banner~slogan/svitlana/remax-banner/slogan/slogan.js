'use strict';

FamousFramework.component('svitlana:remax-banner:slogan', {
    behaviors: {
        '#slogan': {
            'align': [0, 1],
            'origin': [0, 1],
            'mount-point': [0, 1],
            'size': [700, 50],
            'content': '<h2>You need only one company for all your real estate needs!</h2>',
            'style': {
                'color': 'black',
                'font-size': '15px'
            }
        }
    },
    events: {},
    states: {},
    tree: '<node id="slogan">\n    </node>'
});