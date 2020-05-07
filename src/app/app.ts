import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, DirectionalLight, Group, Object3D, MeshPhongMaterial, CylinderGeometry, Mesh, RingGeometry, MeshBasicMaterial, ExtrudeGeometry, Shape, Path } from 'three';
import { Brick } from './brick';
import { Wheel } from './wheel';

export class App {
  private readonly scene = new Scene();
  private readonly light = new DirectionalLight(0xFFFFFF, 1);
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });

  private brick: Object3D;
  private wheel: Object3D;

  constructor() {
    this.brick = new Brick(100, new Color(0x44aa88));
    //this.scene.add(this.brick);

    this.wheel = this.makeRing();
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
    this.brick.rotateY(0.01);
    this.wheel.rotateY(0.01);
    // this.wheel.rotateY(0.01);
    // this.wheel.rotateZ(0.01);
  }

  private makeWheel(): Object3D {

    const material = new MeshPhongMaterial({color: new Color('rgb(50,50,200)')});

    const radius = 50;
    const thetaSegments = 30;
    const thetaLength = undefined; //Math.PI * 1.5;

    const geometryW = new CylinderGeometry(radius, radius, 100, thetaSegments, 1, true, 0, thetaLength);
    const outer = new Mesh(geometryW, material);

    const geometryH = new RingGeometry(30, radius, thetaSegments, undefined, thetaLength);
    const upper = new Mesh(geometryH, material);

    upper.rotation.x = -Math.PI / 2;
    upper.position.y = 50;

    const lower = new Mesh(geometryH, material);

    lower.rotation.x = Math.PI / 2;
    lower.position.y = -50;

    const group = new Group();
    group.add( outer );
    group.add( upper );
    group.add( lower );
    return group;
  }

  private makeRing(): Object3D {
    const group = new Group();

    var arcShape2 = new Shape();
    arcShape2.moveTo(  4, 0);
    arcShape2.lineTo( 10, 0);
    arcShape2.absarc(  0, 0, 10, 0, Math.PI*1.5, false );
    arcShape2.lineTo(  0,-4);
    arcShape2.absarc(  0, 0, 4, Math.PI*1.5, 0, true );

    const extrudeSettings = { 
      amount: 20, 
      bevelEnabled: true, 
      //bevelSegments: 30, 
      steps: 0, 
      bevelSize: 0, 
      bevelThickness: 0, 
      curveSegments: 100 
    };

    const mesh2 = new Mesh(
      new ExtrudeGeometry( arcShape2, extrudeSettings ),
      new MeshPhongMaterial({color: new Color('rgb(50,50,200)')})
    );
    //mesh2.position.set( -35, -30, -20 );
    //mesh2.rotation.set( 0, 0, 0 );
    mesh2.scale.set( 4, 4, 4 );
    group.add( mesh2 );
    //

    return group;
  }
}
