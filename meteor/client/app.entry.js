
// famous stuff
import FamousEngine   from 'famous/core/FamousEngine'
import DOMElement     from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'
import Camera         from 'famous/components/Camera'

import jss            from 'jss'
import jssNested      from 'jss-nested'

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

Template.body.onRendered(function() {
    console.log('Rendered the body.')
    let scene = FamousEngine.createScene('body')

    let camera = new Camera(scene)
    camera.setDepth(1000)

    let squareNode = scene.addChild()
    squareNode.setSizeMode(
        'absolute', 'absolute', 'absolute'
    )
    squareNode.setAbsoluteSize(200,200,0)
    squareNode.setAlign(0.5,0.5,0)
    squareNode.setMountPoint(0.5,0.5,0)

    let square = new DOMElement(squareNode, {
        content: 'Hello.',
        properties: {
            backfaceVisibility: 'visible',
            background: 'pink',
            padding: '5px'
        }
    })

    let rotation = new Transitionable(0)
    rotation.set(2*Math.PI, {duration: 5000, curve: 'expoInOut'})

    let rotationComponent = squareNode.addComponent({
        onUpdate: function() {
            console.log('asdfasdf')
            squareNode.setRotation(0, rotation.get(), 0)
            //if (!rotation.isActive())
                //squareNode.requestUpdateOnNextTick(rotationComponent)
        }
    })
    squareNode.requestUpdateOnNextTick(rotationComponent)

    FamousEngine.init()
})
