'use strict';

FamousFramework.component('svitlana:remax-banner:logo', {
    behaviors: {
        '#logo': {
            'position-z': '50',
            'size': [120, 120]
        },
        'img': {
            'src': 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/balloon-no-shade.png'
        }

    },
    events: {},
    states: {},
    tree: '<node id="logo">\n    <img>\n    </node>'
});