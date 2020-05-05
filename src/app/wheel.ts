import { Color, Mesh, CylinderGeometry, MeshPhongMaterial } from 'three';

export class Wheel extends Mesh {
  constructor(radius: number, height: number, color: Color) {
    super();
    this.geometry = new CylinderGeometry(radius, radius, height, 30)
    this.material = new MeshPhongMaterial({ color });
  }
}
