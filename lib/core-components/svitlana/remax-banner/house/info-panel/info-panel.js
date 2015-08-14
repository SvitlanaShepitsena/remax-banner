FamousFramework.component('svitlana:remax-banner:house:info-panel', {
    behaviors: {
        '#house-info': {
            'align': '[[identity]]',
            'mount-point': [0, 0],
            'scale': '[[identity]]',

            'origin': [0.5, 0.5],
            'size': [160, 160],

            'content': function (index) {
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
             <tr >
             <td colspan="2">
            <a href="${housesData[index].url}">More info</a>
             <td></td>
             </tr>
             </table>`;
                return houseInfo;
            },
            style: {
                'background-color' : 'whitesmoke',
                'border-radius' : '10px',
                'text-align' : 'left'
            },
            'a' : {
                'style' : function(color, fontFamily) {
                    return {
                        'color': color,
                        'font-family': fontFamily,
                        'font-size' : '30px',
                        'text-align' : 'center',
                    }
                }
            }
        }
    },
    events: {
        '$public': {
            'index': '[[setter|index]]',
        },
        '#house-info': {
            'house-info-show': function ($state, $payload) {


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

        color: '#49afeb',
        fontFamily: 'Lato, Helvetica, Arial, sans-serif'

    },
    tree: `<node id="house-info">
    </node>`
}).config({
    includes: [
        '../../galleryData.js'
    ],
});
