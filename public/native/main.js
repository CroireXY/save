/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-05-20 07:25:31
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-05-21 11:54:37
 * @FilePath: \code\public\native\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function img() {
  let rectangle = SSmap.Rectangle.fromDegrees(-180, -90, 180, 90);
  let url = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/WGS84/{z}/{x}/{y}.png";
  var imageryProvider = new SSmap.UrlTemplateImageryProvider(
    url, // url
    true, // useWebMercator
    19, // maximumLevel
    0, // minimumLevel
    256, // tileWidth
    256, // tileHeight
    true // hasAlphaChannel
  );
  //自定义瓦片计算方式，使用此方法时，不会自动计算url中的xyz
  // imageryProvider.setUrlFunctor(function (x, y, level) {
  //     var url = "http://localhost:8890/dzdt/chunri/" + (level - 8) + "/" + y + "/" + x + "?format=image%2Fpng";
  //     //consolg.log("url" + url);
  //     //imageryProvider.setImageUrl(x, y, level, url);
  //     return url;
  //     })

  //设置请求头
  // imageryProvider.setHeader("szvsud-license-key",
  //     "XbZrKCXAKXNnu5cRuyXoCmg2DU8E0ztA8/27O2AS3EtAsqU6Fymn8hqiJicChJyg");
  var imageryLayer = new SSmap.ImageryLayer(imageryProvider, rectangle);
//   Utils.imageLayer = imageryLayer;
  GlobalViewer.scene.globe.addImageryLayer(imageryLayer);



  //添加香港3dtiles模型
//  var tileset = new SSmap.Tileset("https://data.map.gov.hk/api/3d-data/3dtiles/f2/tileset.json?key=3967f8f365694e0798af3e7678509421");
  var tileset = new SSmap.Tileset(window.location.origin + "/map_data/tileset.json");
  // var tileset = new SSmap.Tileset("../../map_data/tileset.json");
  var entity = new SSmap.Entity();
  entity.addComponent(tileset);
  GlobalViewer.scene.addEntity(entity);
  window.viewer.timeSystem.setHour(14);
  window.viewer.timeSystem.setMinute(0);
  window.viewer.timeSystem.setSecond(0);
};

function flyTo({lng, lat, alt}) {
	const position = SSmap.Cartographic.fromDegrees(lng, lat, alt)
	window.GlobalViewer.scene.mainCamera.flyTo(position)
}

//设置授权
function setAuthorize(){
	GlobalViewer.setAuthorizedUrl(
        "url"
    );
}
export {
	flyTo,setAuthorize,img
}