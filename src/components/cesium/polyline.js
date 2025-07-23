/*
 * @Author: Sun ruiqi
 * @Date: 2025-07-22 18:00:48
 * @LastEditors: viola
 * @LastEditTime: 2025-07-23 10:11:33
 * @FilePath: /LAE_Dashboard/src/components/cesium/polyline.js
 */
// src/cesium/materials/PolylineAntialiasing.js
import * as Cesium from 'cesium'

const shader = `
czm_material czm_getMaterial(czm_materialInput materialInput) {
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
 
  float antialias = 1.0 - abs(0.5 - st.t) * 2.0;

  
  float glow = pow(abs(st.t - 0.5) * 2.0, glowPower);
  
  material.diffuse = color.rgb;
  float dis = 1.0 - abs(0.5 - st.t) * 2.0;
  material.alpha = antialias * color.a * (1.0 - glow);
  
  return material;
}
`;

export class PolylineAntialiasingMaterialProperty {
  constructor(opt = {}) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this.color = opt.color;
  }

  get isConstant() {
    return true;
  }

  get definitionChanged() {
    return this._definitionChanged;
  }

  getType() {
    return PolylineAntialiasingMaterialProperty.materialType;
  }

  getValue(time, result = {}) {
    result.color = this.color || Cesium.Color.RED;
    return result;
  }

  equals(other) {
    return this === other || (
      other instanceof PolylineAntialiasingMaterialProperty &&
      other.color === this.color
    );
  }

  static materialType = 'PolylineAntialiasing'
}

// 注册材质，只注册一次
if (!Cesium.Material._materialCache._materials[PolylineAntialiasingMaterialProperty.materialType]) {
  Cesium.Material._materialCache.addMaterial(PolylineAntialiasingMaterialProperty.materialType, {
    fabric: {
      type: PolylineAntialiasingMaterialProperty.materialType,
      uniforms: {
        color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        glowPower: 1.0
      },
      source: shader
    },
    translucent: true
  });
}
