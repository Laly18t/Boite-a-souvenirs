import { Raycaster, Vector2 } from 'three';
import App from '../App';
import EventEmitter from '../Utils/EventEmitter';

export default class RaycasterHandler extends EventEmitter {
    constructor() {
        super();

        this.app = new App();
        this.camera = this.app.camera.perspective;
        this.scene = this.app.scene;
        this.canvas = this.app.canvas;

        
        this.raycaster = new Raycaster(); // 👈 super important!
        this.mouse = new Vector2();
        this.intersected = [];

        this.mouseMoveBound = this.onMouseMove.bind(this);
        this.clickBound = this.onClick.bind(this);

        this.init();
    }

    init() {
        this.canvas.addEventListener('mousemove', this.mouseMoveBound);
        this.canvas.addEventListener('click', this.clickBound);

       
    }

    onMouseMove(event) {
        const { width, height } = this.canvas.getBoundingClientRect();

        this.mouse.x = (event.clientX / width) * 2 - 1;
        this.mouse.y = -(event.clientY / height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        this.intersected = this.raycaster.intersectObjects(this.scene.children, true);
        this.trigger('mousemove', [this.intersected]);
    }

    onClick(event) {
        if (this.intersected.length > 0) {
            this.trigger('click', [this.intersected]);
        }
    }

    destroy() {


        this.canvas.removeEventListener('mousemove', this.mouseMoveBound);
        this.canvas.removeEventListener('click', this.clickBound);

        this.mouseMoveBound = null;
        this.clickBound = null;
    }
}
