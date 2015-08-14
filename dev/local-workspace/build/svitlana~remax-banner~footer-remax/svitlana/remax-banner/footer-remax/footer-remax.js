'use strict';

FamousFramework.component('svitlana:remax-banner:footer-remax', {
    behaviors: {
        '#footerRemax': {
            'style': {
                'background-color': 'red'
            }
        },
        '#slogan': {
            'align': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'position-z': '5'
        }
    },
    events: {},
    states: {},
    tree: '<node id="footerRemax">\n        <slogan id="slogan"></slogan>\n    </node>'
}).config({
    imports: {
        'svitlana:remax-banner:footer-remax': ['slogan']
    }
});