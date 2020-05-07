import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, DirectionalLight, Object3D, AxesHelper } from 'three';
// import { Brick } from './brick';
import { Wheel } from './wheel';

export class App {
  private readonly scene = new Scene();
  private readonly light = new DirectionalLight(0xFFFFFF, 1);
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });

  // private brick: Object3D;
  private wheel: Object3D;

  constructor() {
    const axesHelper = new AxesHelper( 200 );
    this.scene.add( axesHelper );

    // this.brick = new Brick(100, new Color(0x44aa88));
    // this.scene.add(this.brick);

    this.wheel =  new Wheel(50, 30, 100, new Color(0x44aa88)); // this.makeRing();
    this.scene.add(this.wheel);

    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);

    this.camera.position.set(200, 200, 200);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color('rgb(30,30,30)'));

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());

    this.adjustCanvasSize();

    this.scene.rotateY(0.01);
  }

}
