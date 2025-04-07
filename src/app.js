import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import Cube from './World/Cube.js'

export default class App {
    constructor(canvas){
        this.canvas = canvas

        this.scene = null
        this.camera = null
        this.renderer = null

        this.cube = null

        this.init()
    }

    init (){
        this.scene = new Scene()

        const aspect = this.canvas.clientWidth / this.canvas.clientHeight
        this.camera = new PerspectiveCamera(90, aspect, 0.1, 10)

        this.renderer = new WebGLRenderer({
            canvas : this.canvas,
            antialias : true
        })

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
        this.renderer.setPixelRatio(1)

        this.cube = new Cube()
        this.cube.instance.position.set(0, 0, -5)
        this.scene.add(this.cube.instance)

        this.animate()
    }

    animate(){
        requestAnimationFrame(() => this.animate)
        this.renderer.render(this.scene, this.camera)
    }

    destroy(){
        //release memory of the scene 
        // ....
        this.scene = null 
        this.camera = null
        this.renderer = null

        this.cube.detroy()
        this.cube = null

        this.canvas = null
    }
}