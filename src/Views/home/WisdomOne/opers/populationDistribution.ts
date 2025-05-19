import { getBorder } from "@/api/home";
import { useAirCityStore } from "@/stores/aircity";
import { ref } from "vue"

// 当前进度条的进度
export const active = ref(0)
// 年的数据
export const yearsData = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]

// 取消播放按钮
export const isCancel = ref(true);

// 当前动画是否进行中
let isLoading = false;
// 是否需要下降操作
let isNeedDown = false;

// 年份播放
let isYearPlay = false;

const arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
const curTileInfo = [
  arr.map(p => '2005' + p),
  arr.map(p => '2006' + p),
  arr.map(p => '2007' + p),
  arr.map(p => '2008' + p),
  arr.map(p => '2009' + p),
  arr.map(p => '2010' + p),
  arr.map(p => '2011' + p),
  arr.map(p => '2012' + p),
  arr.map(p => '2013' + p),
  arr.map(p => '2014' + p),
  arr.map(p => '2015' + p),
]

/**
 * 通过id来显示图层
 * @param ids  需要显示id的数组
 * @returns 
 */
const showNeedTreeInfo = async (ids: string[]) => {
  ids = ids.filter(f => f)
  if (!ids || !ids.length) return
  __g.infoTree.show(ids)
}
/**
 * 通过id来隐藏图层
 * @param ids  需要隐藏id的数组
 * @returns 
 */
const hideNeedTreeInfo = (ids: string[]) => {
  ids = ids.filter(f => f)
  if (!ids || !ids.length) return
  __g.infoTree.hide(ids)
}

/**
 * 隐藏所有的图层
 */
const hideAllTreeInfo = () => {
  __g.infoTree.hide(Array.from(map.values()))
}

/**
 * 初始化人口分布
 */
export const initPopulationDistribution = () => {
  // 停止导览播放
  __g.camera.stopAnimation()
  initTileLay();
  // 异常所有图层
  hideAllTreeInfo();
  // 设置黑暗模式
  __g.weather.setDarkMode(true);

  // 设置相机视角
  __g.camera.set(499648.825, 2594354.153125, 27336.835, -6.681578, 153.176163, 0)

  // 显示地形图层
  showNeedTreeInfo([map.get('地形影像') as string, map.get('200501') as string]);

  active.value = 0;
  // 自动播放
  yearPlay(0)
  // 添加蒙版
  highLightArea()

}


/**
 * 图层store
 */
const tileLayerStore = useAirCityStore()

/**
 * 图层map
 */
const map = new Map<string, string>();

/**
 * 初始化图层信息
 */
const initTileLay = () => {
  const treeObjList = tileLayerStore.TreeInfo;
  (treeObjList as any).forEach((item: any) => {
    map.set(item.name, item.iD)
  })
}

/**
 * 上一个图层的信息
 */
let preTileInfo: any = [];


/**
 *延迟函数
*@param time 时间
*/
const delay = (time: number) => {
  return new Promise<void>(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, time)
  })
}



/**
 * 上涨函数
 */
const up = async (arr: string[]) => {
  if (!arr || !arr.length) return
  let index = 0;
  isNeedDown = true;
  for (; index < arr.length; index++) {
    if (isCancel.value && !isYearPlay) {
      break
    }
    await showNeedTreeInfo([map.get(arr[index]) as string]);
    await delay(50)
  }

}


/**
 * 下降函数
 */
const down = async (arr: string[]) => {
  if (!arr || !arr.length) return
  let index = arr.length - 1;

  for (; index >= 0; index--) {
    if (isCancel.value && !isYearPlay) {
      break
    }
    if (active.value === 0 && index === 0) {
      break
    }
    hideNeedTreeInfo([map.get(arr[index]) as string]);
    await delay(50)
  }
  isNeedDown = false;
}

/**
 * 年播放
 * @param year 
 */
export const yearPlay = async (year: number) => {
  if (isLoading) {
    alert('请等动画结束在操作!')
    return
  }
  isLoading = true;
  isYearPlay = true;
  // 判断当前是否已经是上涨的，如果是，先进行下降，然后在上涨
  if (isNeedDown) {
    // 进行下降
    await down(curTileInfo[active.value])
  }
  // 赋值当前年
  active.value = year;
  // 进行上涨
  await up(curTileInfo[active.value])
  isYearPlay = false;
  isLoading = false
}

/**
 * 点击按钮进行播放
 */
export const btnPlay = async () => {
  if (isLoading) {
    alert('请等动画结束在操作!')
    return
  }
  isLoading = true;
  isCancel.value = false
  // 判断当前是否需要进行下降
  if (isNeedDown) {
    // 那就需要进行下降
    // 进行下降
    await down(curTileInfo[active.value])
    // 等待2.5s
    // await delay(1000)
    active.value++;
  }

  // 判断当前的active的值是否大于curTileInfo的length
  if (active.value === curTileInfo.length) {
    active.value = 0
  }

  // 进行上涨和下降操作
  while (active.value <= curTileInfo.length - 1) {
    if (isCancel.value) break
    // 先进行上涨操作
    // 进行上涨
    await up(curTileInfo[active.value])
    // await delay(1000)
    // 进行下降操作,需要判断是否是最后一项， 最后一项不需要下降，并且是否是播放状态
    if (active.value < curTileInfo.length - 1 && !isCancel.value) {
      await down(curTileInfo[active.value])
      // 进行下一项播放
      active.value++;
      // await delay(1000)
    } else {
      // 播放完毕，直接暂停
      isCancel.value = true
      isLoading = false;
      break
    }
  }


  /**
   * 年播放
   * @param year 
   */
  // export const yearPlay = async (year: number) => {
  //     const tileArr = curTileInfo[year];
  //     const len = tileArr.length


  //     let index = 0;
  //     const num = window.requestAnimationFrame(_play)
  //     function _play() {
  //         if (index === len) {
  //             window.cancelAnimationFrame(num)
  //         } else {
  //             const showArr: string[] = [], hideArr: string[] = [];
  //             // 下降操作
  //             if (preTileInfo.length > 0) {
  //                 if (index > 0) {
  //                     // 显示上一项
  //                     showArr.push(map.get(preTileInfo[len - index - 1 - 1]) as string)
  //                 }
  //                 hideArr.push(map.get(preTileInfo[len - index - 1]) as string)
  //             }
  //             // 上升操作
  //             if (index > 0) {
  //                 hideArr.push(map.get(tileArr[index - 1]) as string)
  //             }

  //             showArr.push(map.get(tileArr[index]) as string);

  //             showNeedTreeInfo(showArr);
  //             hideNeedTreeInfo(hideArr);

  //             index++;
  //             if (index === len - 1) {
  //                 preTileInfo = curTileInfo[year]
  //                 active.value = year;
  //             }
  //             window.requestAnimationFrame(_play)
  //         }
  //     }

  // tileArr.forEach((i, index) => {
  //     setTimeout(() => {
  //         const showArr: string[] = [], hideArr: string[] = [];
  //         // 下降操作
  //         if (preTileInfo.length > 0) {
  //             if (index > 0) {
  //                 // 显示上一项
  //                 showArr.push(map.get(preTileInfo[len - index - 1 - 1]) as string)
  //             }
  //             hideArr.push(map.get(preTileInfo[len - index - 1]) as string)
  //         }
  //         // 上升操作
  //         if (index > 0) {
  //             hideArr.push(map.get(tileArr[index - 1]) as string)
  //         }

  //         showArr.push(map.get(i) as string);

  //         showNeedTreeInfo(showArr);
  //         hideNeedTreeInfo(hideArr);

  //         if (index === len - 1) {
  //             preTileInfo = curTileInfo[year]
  //             active.value = year;
  //         }
  //     }, 10)
  // })

}


const highLightArea = async () => {

  getBorder().then((data: any) => {
    data.features.forEach((item: any, index: number) => {
      const coordinate1 = JSON.parse(JSON.stringify(item.geometry.coordinates[0]))
      __g.highlightArea.clear();
      const o = {
        id: '2',
        coordinates: coordinate1,
        color: [0, 0, 0, 0.75],      //多边形高亮颜色
        heightRange: [0.0, 1000000.0],  //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
        intensity: 1.0,             //高亮颜色的强度
        depthTest: true             //深度检测
      };
      __g.highlightArea.add(o);
    })
  })
}


/**
 * 清理掉人口分布数据
 */
export const clearPopulationDistribution = () => {
  stop()
  preTileInfo = []
  // hideNeedTreeInfo([map.get('地形影像') as string, map.get('200501') as string])
  hideAllTreeInfo()
  __g.weather.setDarkMode(false);
  __g.highlightArea.clear();

}

/**
 * 停止定时器
 */
export const stop = () => {
  isCancel.value = true;
  isYearPlay = false
  isLoading = false;
}



