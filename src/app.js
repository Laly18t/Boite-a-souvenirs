import { PerspectiveCamera, Scene, WebGLRenderer } from "three"
import Cube from "./World/Cube"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import EventEmitter from "./Utils/EventEmitter"
import CanvasSize from "./Core/CanvasSize"
import Camera from "./Core/Camera"
import Renderer from "./Core/Renderer"
import { AnimationLoop } from "./Core/AnimationLoop"
import { AssetManager } from "./Assets/AssetManager"
import Room from "./World/Room"
import RaycasterHandler from "./Core/RaycasterHandler"


let myAppInstance = null

export default class App extends EventEmitter {
    constructor(canvas) {
        if (myAppInstance !== null) {
            return myAppInstance
        }

        super()

        myAppInstance = this

        this.canvas = canvas
        this.canvasSize = new CanvasSize(canvas)

        this.updateBound = null
        this.assetsLoadCompleteHandlerBound = null

        this.animationLoop = null

        this.scene = null
        this.camera = null
        this.renderer = null

        this.assetManager = null


       
        this.room = null
        this.cube = null
        this.RaycasterHandler = null

        this.init()
    }

    init() {
        this.renderer = new Renderer()
        this.camera = new Camera()

        this.raycasterHandler = null

        this.animationLoop = new AnimationLoop()
        this.updateBound = this.update.bind(this)
        this.animationLoop.on('update', this.updateBound)

        this.assetManager = new AssetManager()
        this.assetsLoadCompleteHandlerBound = this.assetsLoadCompleteHandler.bind(this)
        this.assetManager.on('ready', this.assetsLoadCompleteHandlerBound)

        this.assetManager.load()
    }

    initScene() {
        this.scene = new Scene()

        this.room = new Room()
        this.cube = new Cube()

        this.scene.add(this.room.instance)
        this.scene.add(this.cube.instance)


       
    }

    assetsLoadCompleteHandler() {
        this.initScene()
        this.raycasterHandler = new RaycasterHandler(); // 👈 move here
        this.animationLoop.start()

        this.raycasterHandler.on("click", (intersects) => {
            const hit = intersects.find(i => i.object === this.cube.instance);
            if (hit) {
                this.cube.grow();
            }
        });
    }

    update() {
        this.renderer.instance.render(this.scene, this.camera.perspective)
    }

    destroy() {
        // Release memory of the scene
        this.scene.remove(this.room)
        this.room.destroy()
        this.room = null
        this.cube.destroy()
        this.cube = null
        this.scene = null

        this.camera.destroy()
        this.camera = null

        this.renderer.destroy()
        this.renderer = null

        this.animationLoop.off('update')
        this.animationLoop = null
        this.updateBound = null

        this.assetManager.off('ready')
        this.assetsLoadCompleteHandlerBound = null
        this.assetManager.destroy()
        this.assetManager = null

        this.canvas = null

        myAppInstance = null
    }
} 