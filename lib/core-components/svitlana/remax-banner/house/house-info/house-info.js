FamousFramework.component('svitlana:remax-banner:house:house-info', {
    behaviors: {
        '#house-info': {
            'align': '[[identity]]',
            'mount-point': [0, 0],
            'scale': '[[identity]]',
            'origin': [0.5, 0.5],
            'position-z': 3,
            'size': [100, 25],
            style: {
                'background-color': 'whitesmoke'
            },
        },
        '#house-info-content': {
            'align': [0, 0],
            'origin': [0, 0],
            'position-z': 3,
            'size': [100, 25],

            'content': function (index) {
                console.log(index);
                var houseInfo = `
                <a style="display:block;color:#034C89;font-weight:600" href="${housesData[index].url}" target="_blank">
                 <div style="width:auto;margin-left:4px;display:inline-block" class="fs-caption">${housesData[index].city}, ${housesData[index].state}</div>
                 <img style="display:inline-block;margin: 4px;2px;float:right" width="16px" height="16px" src="https://s3-us-west-2.amazonaws.com/svet.com/ad/get-info.png"/></a>`;
                return houseInfo;
            },
            'a': {
                'style': function (color, fontFamily) {
                    return {
                        'color': 'black',
                        'font-family': fontFamily,
                        'font-size': '11px',
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
    tree: 'house-info.html',
}).config({
    includes: [
        '../../galleryData.js',
        '../../remax-banner.css'
    ],
});
