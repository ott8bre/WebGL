import { Color, Mesh, MeshPhongMaterial, Shape, ExtrudeGeometry } from 'three';

export class Wheel extends Mesh {
  constructor(outerRadius: number, innerRadius: number, height: number, color: Color) {
    super();

    const shape = new Shape();
    shape.moveTo( innerRadius, 0);
    shape.lineTo( outerRadius, 0);
    shape.absarc(  0, 0, outerRadius, 0, Math.PI*1.5, false );
    shape.lineTo(  0,-innerRadius);
    shape.absarc(  0, 0, innerRadius, Math.PI*1.5, 0, true );

    const extrudeSettings = {
      amount: height,
      bevelEnabled: true,
      // bevelSegments: 30,
      steps: 0,
      bevelSize: 0,
      bevelThickness: 0,
      curveSegments: 100
    };

    this.geometry = new ExtrudeGeometry( shape, extrudeSettings ),
    this.material = new MeshPhongMaterial({ color });

    this.rotateZ(Math.PI * 0.125);
  }
}
