FamousFramework.component('svitlana:remax-banner:slogan', {
    behaviors: {
        '#slogan': {
            'align': [.95, 0.89],
            'origin': [.95, 0.89],
            'mount-point': [.95, 0.89],
            'size': [160, 16],
            'content': '<div>Let us guide you!</div>',
            'position-y': '0',
            'position-z': '150',
            'style': {
                'font-family': 'Lucida Sans, Verdana, sans-serif',
                'cursor': 'pointer',
                'color': 'white',
                //'text-align': 'right',
                'font-size': '14px',
                'text-shadow': 'rgba(0, 22, 43, 0.901961) 0px -1px 0px',
                //'text-shadow': 'rgba(0, 0, 0, 0.298039) 0px -1px 0px, rgba(255, 255, 255, 0.4) 0px 1px 0px',
            },
        }
    },
    events: {},
    states: {},
    tree: `<node id="slogan">
    </node>`
});
