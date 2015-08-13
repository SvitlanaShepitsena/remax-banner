FamousFramework.component('svitlana:remax-banner:house', {
    behaviors: {
        '#house': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'size': [30, 30],
        },
        'img': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'src':'[[identity|src]]',
            'style': {
                'width': '100px',
                'height': '100px',
            },
        }

    },
    events: {
        '$public': {
            'src': '[[setter|src]]',
        }
    },
    states: {
        imgSrc: null
    },
    tree: `<node id="house">
    <img>
    </node>`
});
