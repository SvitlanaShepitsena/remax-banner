FamousFramework.component('svitlana:remax-banner:house', {
    behaviors: {
        '#house': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'size': [160, 160],
            'position-y': '100'
        },
        '#info-panel': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'size': [160, 160],
            'index': '[[identity]]'
        },
        'img': {
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5],
            'src': '[[identity|src]]',
            'style': {
                'width': '160px',
                'height': '160px',
            },
        }

    },
    events: {
        '$public': {
            'src': '[[setter|src]]',
            'index': '[[setter|index]]',
        }
    },
    states: {
        src: '',
        index:-1
    },
    tree: `<node id="house">
    <img>
    <info-panel id="info-panel"></info-panel>
    </node>`
}).config({
    imports: {
        'svitlana:remax-banner:house': ['info-panel'],
    }
});

