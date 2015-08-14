'use strict';

FamousFramework.component('svitlana:remax-banner:logo', {
    behaviors: {
        '#logo': {
            'position-z': '20',
            'position-x': '10',
            'position-y': '32',
            'size': [100, 100],
            'style': {
                'width': '100px',
                'height': '100px'
            }
        },
        'img': {
            'src': 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/balloon-no-shade.png'
        }

    },
    events: {},
    states: {
        imgSrc: null
    },
    tree: '<node id="logo">\n    <img>\n    </node>'
});