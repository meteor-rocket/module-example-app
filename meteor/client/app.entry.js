
// famous stuff
//import FamousEngine from 'famous/core/FamousEngine'
//import Node         from 'famous/core/Node'
//import Camera       from 'famous/components/Camera'

import jss from 'jss'
import jssNested from 'jss-nested'

//console.log(ExampleExport)

jss.use(jssNested)

let cssReset = jss.createStyleSheet({
    'body, html': {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        position: 'relative'
    }
}, {named: false}).attach()

Template.body.helpers({
    items: function() {
        return Items.find({})
    }
})

Meteor.startup(function() {
    //let scene = FamousEngine.createScene('body')

    //let camera = new Camera(scene)
    //camera.setDepth(1000)

    //let square = new Plane({
        //size: [200,200],
        //content: 'Hello.',
        //properties: {
            //backfaceVisibility: 'visible',
            //background: 'pink',
            //padding: '5px'
        //}
    //})

    //ctx.add(square)
    //square.transform.setRotate([0,2*Math.PI,0], {duration: 5000, curve: 'easeInOut'})
})

