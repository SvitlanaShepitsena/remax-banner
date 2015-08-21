FamousFramework.component('svitlana:remax-banner:house', {
    behaviors: {
        'img': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'src': '[[identity|src]]',
            'style': {
                'width': '100px',
                'height': '100px',
            },
        },
        'house-info': {
            'index':'[[identity|index]]'

        },

    },
    events: {
        '$public': {
            'src': '[[setter|src]]',
            'index': '[[setter|index]]',
        }
    },
    states: {
        src: '',
        index: 1
    },
    tree: 'house.html'
}).config({
    imports: {
        'svitlana:remax-banner:house': ['house-info'],
    }
});

