// import {useDialogStore} from "@/stores/dialog";

import { useDialogStore } from '@/stores/dialog'

const dialogStore = useDialogStore()
const currentHighLightObj = {
    tileId: '',
    actorId: ''
}
const OnEvent = async (e: { Fields: any; eventtype: string; PropertyName?: string; UserData?: string; ObjectID?: string; Id?: string; GroupID?: string; MouseClickPoint?: number[]; Type?: string }) => {
    // const Router = useRouter();
    // 判断是否为左键点击的交互
    console.log(e, '----e')
    if (e.eventtype === 'LeftMouseButtonClick') {
        console.log(e, 'LeftMouseButtonClick')
        if (e.Type === 'shapefilelayer' && dialogStore.isShp) {
            dialogStore.setDialogVisible(true)
            dialogStore.setDialogInfo({
                name: e.Id,
                display_x: e.Fields.display_x,
                display_y: e.Fields.display_y,
                type: 'LeftMouseButtonClick'
            })
        } else {
            dialogStore.setDialogVisible(false)
        }
        // BuildEvent(e);
    }
    if (e.eventtype === 'CameraTourFinished') {
        console.log('导览播放结束')
    }
}

export default OnEvent
// const waitFor = (timeout = 100) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true);
//     }, timeout);
//   });
// };

// export const stopCurrentHighlightActor = async () => {
//   if (currentHighLightObj.actorId) {
//     await __g.tileLayer.stopHighlightActor(
//       currentHighLightObj.tileId,
//       currentHighLightObj.actorId
//     );
//     currentHighLightObj.tileId = "";
//     currentHighLightObj.actorId = "";
//   }
// };
