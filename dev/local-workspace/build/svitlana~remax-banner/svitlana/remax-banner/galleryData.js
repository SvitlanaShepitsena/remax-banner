'use strict';

//store window size before the scene is loaded
var contextSize = window.innerHeight;

function randomCoordinates(imageData) {
    var result = [];
    for (var i = 0; i < imageData.length; i++) {
        //start outside of the viewing window and random disperse below
        result.push(Math.floor(contextSize / 2 + 100 + Math.random() * contextSize * 2));
    }
    return result;
}
var imageData = ['https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1115-bradford-ln-shaumburg.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1222-calibou-ln-hoffman-estates.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-2110-laramie-chicago.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-8910-knox-ave-skokie.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1115-bradford-ln-shaumburg.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1222-calibou-ln-hoffman-estates.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-2110-laramie-chicago.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-8910-knox-ave-skokie.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1115-bradford-ln-shaumburg.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1222-calibou-ln-hoffman-estates.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-2110-laramie-chicago.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-8910-knox-ave-skokie.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1115-bradford-ln-shaumburg.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1222-calibou-ln-hoffman-estates.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-2110-laramie-chicago.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-8910-knox-ave-skokie.jpg'];