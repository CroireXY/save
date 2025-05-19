/**
 * 播放初始化导览
 */
let AnimationList: any = []
export const playInitAnimation = async (type = AnimationType.Initialization) => {
    const res: any = await __g.camera.getAnimationList()
    const nameArr = ['初始化']
    if (!AnimationList.length) {
        const res: any = await __g.camera.getAnimationList()
        AnimationList = res.data
        const obj = AnimationList.filter((item: any) => item.name == nameArr[type])
        await __g.camera.playAnimation(obj[0].id)
    } else {
        const obj = AnimationList.filter((item: any) => item.name == nameArr[type])
        await __g.camera.playAnimation(obj[0].id)
    }
}
 
/**
 * 导览名字枚举
 */
export enum AnimationType {
    /**
     * 城市孪生 初始化
     */
    Initialization = 0,
    /**
     * 地形初始化
     */
    shuidianzhanweizhi = 1,
    /**
     * 直冲云霄
     */
    Clouds = 2,
    /**
     * 工艺
     */
    process = 3
}