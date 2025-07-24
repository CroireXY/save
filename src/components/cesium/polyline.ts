/*
 * @Author: Sun ruiqi
 * @Date: 2025-07-23 15:27:47
 * @LastEditors: viola
 * @LastEditTime: 2025-07-24 14:37:03
 * @FilePath: /LAE_Dashboard/src/components/cesium/polyline.ts
 */
// src/cesium/materials/polyline.ts
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

export class PolylineAntialiasingMaterialProperty implements Cesium.MaterialProperty {
  private _definitionChanged: Cesium.Event<(...args: any[]) => void>;
  private _color?: Cesium.Color;

  constructor(opt: { color?: Cesium.Color } = {}) {
    this._definitionChanged = new Cesium.Event();
    this._color = opt.color;
  }

  get isConstant(): boolean {
    return true;
  }

  get definitionChanged(): Cesium.Event<(...args: any[]) => void> {
    return this._definitionChanged;
  }

  getType(_time: Cesium.JulianDate): string {
    return PolylineAntialiasingMaterialProperty.materialType;
  }

  getValue(time: Cesium.JulianDate, result: any = {}): any {
    result.color = this._color || Cesium.Color.RED;
    return result;
  }

  equals(other?: Cesium.MaterialProperty): boolean {
    return this === other ||
      (other instanceof PolylineAntialiasingMaterialProperty &&
        other._color === this._color);
  }

  static materialType: string = 'PolylineAntialiasing';
}

// 注册材质，只注册一次
// const cache = (Cesium.Material as any)._materialCache;
// if (!cache._materials[PolylineAntialiasingMaterialProperty.materialType]) {
//   Cesium.Material._materialCache.addMaterial(PolylineAntialiasingMaterialProperty.materialType, {
//     fabric: {
//       type: PolylineAntialiasingMaterialProperty.materialType,
//       uniforms: {
//         color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
//         glowPower: 1.0
//       },
//       source: shader
//     },
//     translucent: true
//   });
// }
const materialType = PolylineAntialiasingMaterialProperty.materialType;

// 强制类型转换为 any 来访问 _materialCache
const materialCache = (Cesium.Material as any)._materialCache;

if (!materialCache._materials[materialType]) {
  materialCache.addMaterial(materialType, {
    fabric: {
      type: materialType,
      uniforms: {
        color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        glowPower: 1.0
      },
      source: shader
    },
    translucent: true
  });
}
