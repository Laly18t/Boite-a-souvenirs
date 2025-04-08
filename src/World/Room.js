import { Mesh, MeshNormalMaterial } from "three"
import App from "../App"
import { AssetManager } from "../Assets/AssetManager"

export default class Room {
    constructor() {
        this.instance = null
    
        this.app = new App()
        this.assetManager = this.app.assetManager

        this.init()
    }

    init() {
        const material = new MeshNormalMaterial()
        const model = this.assetManager.getItem('childrenRoom')
        this.instance = model.scene
        console.log(model.scene)
    }
    destroy() {
        this.instance = null

        this.app = null
    }
}