FamousFramework.component('svitlana:remax-banner:house:house-info', {
    behaviors: {
        '#house-info': {
            'align': '[[identity]]',
            'mount-point': [0, 0],
            'scale': '[[identity]]',
            'origin': [0.5, 0.5],
            'position-z': 3,
            'size': [100, 40],

            'content': function (index) {
                console.log(index);
                var houseInfo = `
             <span class="fs-caption">${housesData[index].city},</span>
             <span class="fs-caption">${housesData[index].state}</span>
             <div class="fs-body-1  text-right"><a href="${housesData[index].url}" target="_blank">More info</a></div> `;
                return houseInfo;
            },
            style: {
                'background-color': 'whitesmoke',
                'text-align': 'left'
            },
            'a': {
                'style': function (color, fontFamily) {
                    return {
                        'color': color,
                        'font-family': fontFamily,
                        'font-size': '10px',
                        'text-align': 'center',
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
        '../../galleryData.js',
        '../../remax-banner.css'
    ],
});
