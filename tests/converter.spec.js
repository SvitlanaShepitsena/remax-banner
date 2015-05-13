'use strict';

var test = require('tape');

var converter = require('../converter');

var toSalty = converter.sweetToSalty;
var toSweet = converter.saltyToSweet;

var sweetTimeline = {
    '#pen': {
        'position': {
            0     : { value: [0, 0, 0], curve: 'outExpo' },
            1000  : { value: [1, 1, 1] }
        }
    }
}

var saltyTimeline = {
    'position': [
        [0,     [0, 0, 0],  'outExpo'],
        [1000,  [1, 1, 1],  'linear']
    ]
}

test('convert between timeline representations', function(t) {
    t.plan(1);

    var actualSaltyTimeline = toSalty(sweetTimeline);
    t.deepEqual(actualSaltyTimeline, saltyTimeline, 'should convert sweet to salty')
});

