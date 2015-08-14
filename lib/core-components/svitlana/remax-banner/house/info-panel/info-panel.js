FamousFramework.component('svitlana:remax-banner:house:info-panel', {
    behaviors: {
        '#house-info': {
            'align': '[[identity]]',
            'mount-point': [0, 0],
            'scale': '[[identity]]',

            'origin': [0.5, 0.5],
            'size': [160, 160],

            'content': function (houseInfo) {


                return houseInfo;
            },
            'style': {
                'background': 'green'
            },
        }
    },
    events: {
        '$public': {
            'index': '[[setter|index]]',
        },
        '#house-info': {
            'house-info-show': function ($state, $payload) {
                var index = $state.get('index');
                var idClicked = $payload.id;
                if (index !== idClicked) {
                    return;
                }

                var houseInfo = `<table>
             <tr>
             <td>City:</td>
             <td>${housesData[index].city}</td>
             </tr>
             <tr>
             <td>Bedrooms:</td>
             <td>${housesData[index].beds}</td>
             </tr>
             <tr>
             <td>Price</td>
             <td>${housesData[index].price}</td>
             </tr>
             </table>`;

                $state.set('houseInfo',houseInfo);

                $state.set('align', [0, 1], {
                    duration: 2500,
                    curve: 'easeOutBounce'
                });
                $state.set('scale', [1, 1], {
                    duration: 2500
                });
            },
            'house-info-hide': function ($state, $payload) {

                $state.set('align', [0, 0], {
                    duration: 2500
                });
                $state.set('scale', [0, 0], {
                    duration: 2500
                });
            }
        }
    },
    states: {
        align: [0, 0],
        scale: [0, 0],
        houseInfo: '',
        index: 0,

    },
    tree: `<node id="house-info">
    </node>`
}).config({
    includes: [
        '../../galleryData.js'
    ],
});
