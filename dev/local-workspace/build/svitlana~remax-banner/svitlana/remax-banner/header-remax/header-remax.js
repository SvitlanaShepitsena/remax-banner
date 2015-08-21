'use strict';

FamousFramework.component('svitlana:remax-banner:header-remax', {
    behaviors: {
        '#headerRemax': {
            'size-proportional-x': function () {
                return 1;
            },
            'size-absolute-y': 30,
            'align': [0.5, 0.03],
            'mount-point': [0.5, 0],

            'position-x': '0',
            'position-y': '10',
            'position-z': '150',
            'style': {
                'background-color': '#B91823'
            }
        },
        '#headerContent': {
            'position-x': '0',
            'position-y': '0',
            'position-z': '5',
            'size': [700, 16],
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'content': '<div>YOU NEED ONLY ONE COMPANY FOR ALL YOUR REAL ESTATE NEEDS!</div>',
            'style': {
                'font-family': 'Lucida Sans, Verdana, sans-serif',
                'color': 'white',
                'text-align': 'center',
                'font-size': '14px',
                'text-shadow': 'rgba(0, 0, 0, 0.298039) 0px -1px 0px, rgba(255, 255, 255, 0.4) 0px 1px 0px'
            }
        }
    },
    events: {},
    states: {
        windowWidth: windowWidth
    },
    tree: 'header.html'
});