import { useAirCityStore } from '@/stores/aircity'

const tileLayerStore = useAirCityStore()


/**
 * 显示需要的图层
 * @param showArr 需要显示的图层名称数组
 */
export const showNeedTreeInfo = async (showArr: string[]) => {
    // 获取到的图层
    // const infotree = await __g.infoTree.get()
    // const treeObjList = infotree.infotree
    const treeObjList = tileLayerStore.TreeInfo

    const showTreeIdList = treeObjList && (treeObjList as any).filter((item: any) => showArr.includes(item.name)).map((p: any) => p.iD)

    // await __g.infoTree.show(showTreeIdList)
}

/**
 * 隐藏指定的图层
 * @param showArr 需要显示的图层名称数组
 */
export const hideNeedTreeInfo = async (showArr: string[]) => {
    // 获取到的图层
    // const infotree = await __g.infoTree.get()
    // const treeObjList = infotree.infotree
    const treeObjList = tileLayerStore.TreeInfo
    const showTreeIdList = treeObjList && (treeObjList as any).filter((item: any) => showArr.includes(item.name)).map((p: any) => p.iD)

    // const r = await __g.infoTree.hide(showTreeIdList)
    // console.log(showArr, showTreeIdList, r, '---------showTreeIdList')
}

/**
 * 显示所有图层
 */
export const showAllTreeInfo = async () => {
    // 获取到的图层
    // const infotree = await __g.infoTree.get()
    // const treeObjList = infotree.infotree
    // const showTreeIdList = treeObjList.map((p: any) => p.iD)
    const treeObjList = tileLayerStore.TreeInfo
    const showTreeIdList = treeObjList && (treeObjList as any).map((p: any) => p.iD)

    // await __g.infoTree.show(showTreeIdList)
}

/**
 * 隐藏所有图层
 */
export const hideAllTreeInfo = async () => {
    // 从store中获取所有的图层id

    // 获取到的图层

    // const infotree = await __g.infoTree.get()
    // const treeObjList = infotree.infotree
    // const showTreeIdList = treeObjList.map((p: any) => p.iD)
    const treeObjList = tileLayerStore.TreeInfo
    const showTreeIdList = treeObjList && (treeObjList as any).map((p: any) => p.iD)
    // await __g.infoTree.hide(showTreeIdList)
}
