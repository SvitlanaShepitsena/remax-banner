'use strict';

FamousFramework.component('svitlana:remax-banner:slogan', {
    behaviors: {
        '#slogan': {
            'size': [700, 50],
            'content': '<h2>You need only one company for all your real estate needs!</h2>',
            'style': {
                'background-color': 'red',
                'color': 'red',
                'font-size': '15px'
            }
        }
    },
    events: {},
    states: {},
    tree: '<node id="slogan">\n    </node>'
});