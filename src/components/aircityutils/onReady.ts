/*
 * @Author: your name
 * @Date: 2021-08-30 15:24:44
 * @LastEditTime: 2022-05-11 09:22:59
 * @LastEditors: 张祥 17839092765@163.com
 * @Description: In User Settings Edit
 * @FilePath: \aircityinit\src\AirCityUtils\onReady.js
 */
import { useAirCityStore } from "@/stores/aircity";
import { useDialogStore } from "@/stores/dialog";
import { useToolsStore } from "@/stores/tools";
import { toTree } from "../tools/layerTree";

let ele: any;
let lastEvent: PointerEvent;
const OnReady = async () => {
  __g.settings.setCampassVisible(false);
  __g.misc.setMainUIVisibility(false);
  const AirCityStore = useAirCityStore();
  const dialogStore = useDialogStore();
  const ToolsStore = useToolsStore();

  const res: any = await __g.infoTree.get();
  AirCityStore.SetTreeInfo(res.infotree);

  ToolsStore.Setinfotree(toTree(res.infotree));
  AirCityStore.SetIsOnReady(true);
  ele = document.querySelector("#player video");
  if (ele) {
    ele.onclick = (e: PointerEvent) => {
      // console.log(e);
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
      lastEvent = e;
      dialogStore.setLastEvent(lastEvent);
    };
  }

  // __g.camera.set(-880.22375, 297.659512, 497.102852, -32.62719, 24.007072,0)
};
export default OnReady;
