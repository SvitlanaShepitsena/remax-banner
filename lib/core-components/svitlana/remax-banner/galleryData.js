'use strict'

//store window size before the scene is loaded
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

function randomCoordinates(imageData) {
    var result = [];
    for (var i = 0; i < imageData.length; i++) {
        //start outside of the viewing window and random disperse below
        result.push(Math.floor(20-Math.random()*40));
    }
    return result;
}
var imageData = [
    'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1115-bradford-ln-shaumburg.jpg',
    'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1222-calibou-ln-hoffman-estates.jpg',
    'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-2110-laramie-chicago.jpg',
    'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-8910-knox-ave-skokie.jpg'


];
var housesData = [
    {
        city: 'Shamburg',
        state: 'IL',
        price: 1000,
        url:'http://www.remax1stclass.com/Homes-Sale-Winnetka/5'
    },
    {
        city: 'Hoffman',
        state: 'IL',
        price: 2000,
        url:'http://www.remax1stclass.com/Homes-Sale-Winnetka/5'
    },
    {
        city: 'Chicago',
        state: 'IL',
        price: 500,
        url:'http://www.remax1stclass.com/Homes-Sale-Winnetka/5'
    },
    {
        city: 'Skokie',
        state: 'IL',
        price: 10000,
        url:'http://www.remax1stclass.com/Homes-Sale-Winnetka/5'
    },

];
