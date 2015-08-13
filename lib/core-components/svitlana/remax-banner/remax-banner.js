FamousFramework.component('svitlana:remax-banner', {
    behaviors: {
        '#root':{
            'style':{  // make the backgound grey
                'background-color':'grey',
                'perspective': '1000px'
            }
        },
        '#rotator-node': {
            'size': [500, 500],          // size as 500px by 500px
            'align': [0.5,0.5],          //center align to window
            'mount-point':[0.5,0.5],     // center self
            'style': {
                'background': 'red'
            }
        },
        '.gallery-item':{
            'size': [100,100],   // 100px by 100px
            'style':{
                'background-color': 'blue'
            },
            '$repeat':function(){
                return [1,2,3,4]   // ? repeat over array
            },
            'position': function($index){  // call this for each item
                return [Math.random()*500, Math.random()*500]
            }
        }
    },          // ? all of our behaviors go here
    events: {},              // ? all of our events go here
    states: {},               // ? our states will go here
    tree: 'tree.html'  // ? we reference our tree here
})
