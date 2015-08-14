'use strict';

//store window size before the scene is loaded
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

function randomCoordinates(imageData) {
    var result = [];
    for (var i = 0; i < imageData.length; i++) {
        //start outside of the viewing window and random disperse below
        result.push(Math.floor(windowHeight / 2 + Math.random() * windowHeight * 2 - 800));
    }
    return result;
}
var imageData = ['https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1115-bradford-ln-shaumburg.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1222-calibou-ln-hoffman-estates.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-2110-laramie-chicago.jpg', 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-8910-knox-ave-skokie.jpg'];
var housesData = [{
    city: 'Shamburg',
    beds: 3,
    price: 1000
}, {
    city: 'Hoffman',
    beds: 5,
    price: 2000
}, {
    city: 'Chicago',
    beds: 1,
    price: 500
}, {
    city: 'Skokie',
    beds: 7,
    price: 10000
}];