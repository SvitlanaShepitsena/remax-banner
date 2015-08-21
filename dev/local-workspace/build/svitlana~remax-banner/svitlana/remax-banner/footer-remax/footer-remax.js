'use strict';

FamousFramework.component('svitlana:remax-banner:footer-remax', {
    behaviors: {
        '#footerRemax': {
            'size-proportional-x': function () {
                return 1;
            },
            'size-absolute-y': 30,
            'align': [.5, 1],
            'mount-point': [.5, 1],
            'style': {
                'background-color': 'rgb(0, 93, 153)',
                'box-shadow': 'rgba(13, 16, 81, 0.639216) 0px 0px 10px 0px inset',
                'background-image': '-webkit-radial-gradient(50% -375px, circle cover, rgb(0, 161, 228) 0px, rgb(0, 93, 153) 750px'
            },
            'position-x': '0',
            'position-y': '-10',
            'position-z': '150'
        },
        '#footerSlogan': {
            'size': [126, 14],
            'mount-point': [.95, .3],
            'align': [.90, .3],
            'content': '<span>Let us guide you!</span>',
            'style': {
                'font-family': 'Lucida Sans, Verdana, sans-serif',
                'cursor': 'pointer',
                'color': 'white',
                'font-size': '14px',
                'text-shadow': 'rgba(0, 22, 43, 0.901961) 0px -1px 0px'
            }
        }
    },
    //'text-shadow': 'rgba(0, 0, 0, 0.298039) 0px -1px 0px, rgba(255, 255, 255, 0.2) 0px 1px 0px',
    events: {},
    states: {
        windowWidth: windowWidth
    },
    tree: 'footer.html'
});