import { useAirCityStore } from "@/stores/aircity";

export class ChaiLou {
  id: string | number;
  tileLayers: any;
  height: number;
  num: number;
  spend: number;
  displacement: number;
  LayerDisplacementNum: number;
  LayerSpend: number;
  direction: "east" | "west" | "south" | "north";
  LayerDisplacement: number;
  OpencObjectDatas: any;
  customObjectIds: any;
  isCliakVal: number | any;
  isCliakdata: any;
  IsOnReady: boolean;
  isClose: boolean;
  isStopRun: boolean;
  cObjectDatas: any;
  timer!: any;
  timer1!: any;
  timer2!: any;
  timer3!: any;
  timer4!: any;
  isClickLayerClose!: boolean;
  location: any;
  NeedHide: any;
  hideIds: any;
  NeedFollow: any;
  NeedFollowData: any;
  pianyi: number;
  infoTree: any;
  overrideMaterials: any;
  XrayIsOpen: any;
  treeids: any;
  Foolr: any;

  constructor(options: {
    id: string | number;
    tileLayers: any;
    NeedFollow?: any;
    height?: number;
    num?: number;
    spend?: number;
    displacement?: number;
    LayerDisplacementNum?: number;
    LayerSpend?: number;
    direction?: "east" | "west" | "south" | "north"; //东西南北
    LayerDisplacement?: number;
    location?: any;
    NeedHide?: any;
    pianyi?: number;
    infoTree?: any;
  }) {
    // id
    this.id = options.id;
    // 接收图层id数组
    this.tileLayers = options.tileLayers;
    // 需要隐藏的楼层
    this.NeedFollow = options.NeedFollow;
    // 图层数信息
    this.infoTree = options.infoTree || null;
    // 坐标信息
    this.location = options.location || [0, 0, 0];

    // todo 位移高度(有多少层写多少)
    this.height = options.height || 4;
    // 位移总数（米）
    this.num = options.num || 10;
    // 每次位移速度
    this.spend = options.spend || 20;
    // 每次位移距离
    this.displacement = options.displacement || 0.5;
    // 楼层抽拉位移
    this.LayerDisplacementNum = options.LayerDisplacementNum || 30;
    // 楼层每次位移速度
    this.LayerSpend = options.LayerSpend || 20;
    // 楼层每次位移距离
    this.LayerDisplacement = options.LayerDisplacement || 0.5;
    // 楼层抽拉方向
    this.direction = options.direction || "north";
    // 记录打开后状态的自定义对象数据
    this.OpencObjectDatas = null;
    // 记录关闭状态的自定义对象数据
    this.customObjectIds = null;
    // 需要抽出的楼层层数
    this.isCliakVal = null;
    // 保存抽出的楼层数据以便来进行切换
    this.isCliakdata = null;
    // 是否添加自定义对象并获取坐标完毕
    this.IsOnReady = false;
    // 是否处于关闭状态
    this.isClose = true;
    // 是否处于不在运动状态
    this.isStopRun = true;

    // 需要隐藏显示的楼层
    this.NeedHide = options.NeedHide || [];
    // 旋转角度
    this.pianyi = options.pianyi || 0;
    this.XrayIsOpen = false;
    this.Foolr = null;
  }

  /**
   * @description: 通过TileLayer添加自定义对象并隐藏原始图层
   * @param {this.tileLayers} 图层id及objectId
   * @return {*}
   */
  async addcustomObject(): Promise<any> {
    // 需要提前获取图层树信息一边后续进行图层id的获取 如果没传 就调用api获取
    const infoTree = this.infoTree ? this.infoTree : await __g.infoTree.get();
    console.log(infoTree, "infoTreeinfoTreeinfoTreeinfoTreeinfoTree");
    // 处理传进来的图层名字 获取id及objectId
    const Ids: any = [];
    this.tileLayers.forEach((item: any) => {
      infoTree.infotree.forEach((mon: any) => {
        item === mon.name && Ids.unshift(mon.iD);
      });
    });

    // 保存自定义对象的id
    this.customObjectIds = Ids;
    console.log(Ids, "customObjectIds");

    // await __g.infoTree.hide(treeid);
    // this.treeids = treeid;
    // 获取添加的自定义对象的信息
    const customObjectData = await __g.tileLayer.get(Ids);
    console.log(customObjectData, "customObjectData");

    this.cObjectDatas = customObjectData.data;
    console.log(this.cObjectDatas, "this.cObjectDatas");
    this.IsOnReady = true;
    console.log("%c 准备完毕", "color:green");
    //   return customObjectData;
    // } else {
    //   console.log("%c 已经准备完毕", "color:green");
    // }
    // 需要隐藏展示方式的楼层
    this.NeedFollowData = {};
    this.NeedFollow &&
      this.NeedFollow.forEach((item: any) => {
        console.log(item);
        infoTree.infotree.forEach(async (mon: any) => {
          if (item.FollowLayer === mon.name) {
            // this.NeedFollowData.Ids.push(mon.iD);
            if (!this.NeedFollowData[item.parent]) {
              this.NeedFollowData[item.parent] = {};
              this.NeedFollowData[item.parent].Id = mon.iD;
            }
          }
        });
      });
  }

  /**
   * @description: 开启模拟楼层拆解
   * @param {*}
   * @return {*}
   */
  async SetOpen(): Promise<any> {
    // 是否拿到模型信息
    if (this.IsOnReady) {
      // 只有引动完毕后才可以继续下一步操作
      if (this.isStopRun) {
        // 已经处于关闭状态
        if (this.isClose) {
          // 打开位移状态
          this.isStopRun = false;
          let i = this.displacement;
          this.timer = setInterval(() => {
            if (i > this.num) {
              /**
               * @description: 使用递归来使所有模型按照顺序来修改位置信息  记录打开后的位置
               * @param {number} j
               * @param {number} length
               * @return {*}
               */
              const setLocationDatas = (j: number, length: number) => {
                this.cObjectDatas[j] = {
                  ...this.cObjectDatas[j],
                  location: [
                    this.cObjectDatas[j].location[0],
                    this.cObjectDatas[j].location[1],
                    this.cObjectDatas[j].location[2] +
                      (i - this.displacement) * (this.height - j), // i - this.displacement 清除一次位移
                  ],
                };

                if (++j < length) {
                  setLocationDatas(j, length);
                }
              };

              setLocationDatas(0, this.cObjectDatas.length);
              this.isClose = false;
              // 关闭位移状态
              this.isStopRun = true;
              clearInterval(this.timer);
              return;
            }
            // __g.customObject.updateBegin();

            /**
             * @description: 使用递归来改变所有模型位置
             * @param {number} j
             * @param {number} length
             * @return {*}
             */
            const setLocation = (j: number, length: number) => {
              __g.tileLayer.setLocation(
                this.cObjectDatas[j].id,
                [
                  this.cObjectDatas[j].location[0],
                  this.cObjectDatas[j].location[1],
                  this.cObjectDatas[j].location[2] + i * (this.height - j),
                ],
                null
              );
              if (++j < length) {
                setLocation(j, length);
              }
            };
            __g.tileLayer.updateBegin();

            setLocation(0, this.cObjectDatas.length);
            __g.tileLayer.updateEnd();

            i += this.displacement;
          }, this.spend);
        } else {
          console.log("%c 已经是开启状态", "color:red");
        }
      } else {
        console.log("%c 正处于位移状态，请稍后", "color:red");
      }
    } else {
      console.log("%c 尚未获取到模型信息，请稍后", "color:red");
    }
  }

  async SetClose(): Promise<any> {
    if (this.IsOnReady) {
      if (this.isStopRun) {
        if (!this.isClose) {
          // 把之前隐藏的对象显示出来

          this.hideIds && __g.tileLayer.show(this.hideIds);

          // 打开位移状态
          this.isStopRun = false;
          let i = this.displacement;
          this.timer1 = setInterval(() => {
            if (i > this.num) {
              const setLocationDatas = (j: number, length: number) => {
                this.cObjectDatas[j] = {
                  ...this.cObjectDatas[j],
                  location: [
                    this.cObjectDatas[j].location[0],
                    this.cObjectDatas[j].location[1],
                    this.cObjectDatas[j].location[2] -
                      (i - this.displacement) * (this.height - j),
                  ],
                };
                if (++j < length) {
                  setLocationDatas(j, length);
                }
              };
              setLocationDatas(0, this.cObjectDatas.length);
              // 情况楼层抽出的数据
              this.isCliakVal = null;
              this.isClose = true;
              this.Foolr = 0;
              // 关闭位移状态
              this.isStopRun = true;
              clearInterval(this.timer1);
              return;
            }
            // __g.customObject.updateBegin();
            const setLocation = (j: number, length: number) => {
              __g.tileLayer.setLocation(
                this.cObjectDatas[j].id,
                [
                  this.cObjectDatas[j].location[0],
                  this.cObjectDatas[j].location[1],
                  this.cObjectDatas[j].location[2] - i * (this.height - j),
                ],
                null
              );
              if (++j < length) {
                setLocation(j, length);
              }
            };
            __g.tileLayer.updateBegin();
            setLocation(0, this.cObjectDatas.length);
            __g.tileLayer.updateEnd();
            i += this.displacement;
          }, this.spend);
        } else {
          console.log("%c 已经是关闭状态", "color:red");
        }
      } else {
        console.log("%c 正处于位移状态，请稍后", "color:red");
      }
    } else {
      console.log("%c 尚未获取到模型信息，请稍后", "color:red");
    }
  }

  async ClickLayer({ val = 0, status = true }): Promise<any> {
    val = this.cObjectDatas.length - val;
    // 校准方向
    const pianyiDisplacement =
      this.pianyi / (this.LayerDisplacementNum / this.LayerDisplacement);

    // 需要启动隐藏的楼层数据
    const NeedHideLayer = this.cObjectDatas.length - val;
    // 需要隐藏其他的楼层数据
    const NeedhideIther = this.cObjectDatas
      .map((item: any, index: number) => {
        if (index < val) {
          return item;
        }
      })
      .filter((mon: any) => mon);

    if (this.IsOnReady) {
      if (this.isStopRun) {
        // 把之前隐藏的对象显示出来
        this.hideIds && __g.tileLayer.show(this.hideIds);
        // 在楼宇关闭状态不能进行
        if (!this.isClose) {
          console.log(this.NeedHide, "this.NeedHide");
          console.log(NeedHideLayer, "NeedHideLayer");

          // 不需要隐藏楼层
          if (this.NeedHide.indexOf(NeedHideLayer) === -1) {
            // 顶层不启动位移
            if (val !== 0) {
              // 状态为打开楼层并且点击的不是同一层
              if (status && this.isCliakVal !== val) {
                // 定位到该楼层
                // __g.tileLayer.focus(this.cObjectDatas[val].id, 80, 2);
                // 打开位移状态
                this.isStopRun = false;
                let i = this.LayerDisplacement;
                let I_pianyi = pianyiDisplacement;
                this.timer2 = setInterval(() => {
                  if (i + this.LayerDisplacement > this.LayerDisplacementNum) {
                    // 运动完毕后保存位置等信息
                    this.isCliakdata = {
                      ...this.cObjectDatas[val],
                      location: [
                        this.cObjectDatas[val].location[0] +
                          (this.direction === "east"
                            ? i
                            : this.direction === "west"
                            ? -i
                            : this.direction === "south" && this.pianyi
                            ? I_pianyi
                            : 0),
                        this.cObjectDatas[val].location[1] +
                          (this.direction === "north"
                            ? i
                            : this.direction === "south"
                            ? -i
                            : 0),
                        this.cObjectDatas[val].location[2],
                      ],
                    };
                    // 关闭位移状态
                    this.isStopRun = true;
                    this.isClickLayerClose = false;
                    this.Foolr = val;
                    clearInterval(this.timer2);
                    return;
                  }
                  // 开始抽出楼层
                  __g.tileLayer.setLocation(
                    this.cObjectDatas[val].id,
                    [
                      this.cObjectDatas[val].location[0] +
                        (this.direction === "east"
                          ? i
                          : this.direction === "west"
                          ? -i
                          : this.direction === "south" && this.pianyi
                          ? I_pianyi
                          : 0),
                      this.cObjectDatas[val].location[1] +
                        (this.direction === "north"
                          ? i
                          : this.direction === "south"
                          ? -i
                          : 0),
                      this.cObjectDatas[val].location[2],
                    ],
                    null
                  );
                  i += this.LayerDisplacement;
                  I_pianyi += pianyiDisplacement;
                }, this.LayerSpend);
                if (
                  (!this.isClickLayerClose && this.isCliakVal) ||
                  this.isCliakVal === 0
                ) {
                  //   // 关闭位移状态
                  // this.isStopRun=true
                  // console.log(this.isCliakdata, "this.isCliakdata");

                  let ii = this.LayerDisplacement;
                  let II_pianyi = pianyiDisplacement;

                  this.timer3 = setInterval(async () => {
                    if (
                      ii + this.LayerDisplacement >
                      this.LayerDisplacementNum
                    ) {
                      // 关闭位移状态
                      this.isStopRun = true;
                      clearInterval(this.timer3);
                      return;
                    }

                    __g.tileLayer.setLocation(
                      this.isCliakdata.id,
                      [
                        this.isCliakdata.location[0] -
                          +(this.direction === "east"
                            ? ii
                            : this.direction === "west"
                            ? -ii
                            : this.direction === "south" && this.pianyi
                            ? II_pianyi
                            : 0),
                        this.isCliakdata.location[1] -
                          (this.direction === "north"
                            ? ii
                            : this.direction === "south"
                            ? -ii
                            : 0),
                        this.isCliakdata.location[2],
                      ],
                      null
                    );
                    ii += this.LayerDisplacement;
                    II_pianyi += pianyiDisplacement;
                  }, this.LayerSpend);
                }

                this.isCliakVal = val;
              } else if (this.isCliakVal === val && !status) {
                this.isStopRun = false;
                let ii = this.LayerDisplacement;
                let I_pianyi = pianyiDisplacement;
                this.timer4 = setInterval(async () => {
                  if (ii + this.LayerDisplacement > this.LayerDisplacementNum) {
                    // 关闭位移状态
                    this.isStopRun = true;
                    this.Foolr = 0;

                    // 改变该楼层位置信息
                    this.isCliakdata = {
                      ...this.cObjectDatas[val],
                      location: [
                        this.cObjectDatas[val].location[0] -
                          (this.direction === "east"
                            ? ii
                            : this.direction === "west"
                            ? -ii
                            : this.direction === "south" && this.pianyi
                            ? I_pianyi
                            : 0),
                        this.cObjectDatas[val].location[1] -
                          (this.direction === "north"
                            ? ii
                            : this.direction === "south"
                            ? -ii
                            : 0),
                        this.cObjectDatas[val].location[2],
                      ],
                    };
                    this.isClickLayerClose = true;
                    this.isCliakVal = null;
                    clearInterval(this.timer4);
                    return;
                  }
                  __g.tileLayer.setLocation(
                    this.isCliakdata.id,
                    [
                      this.isCliakdata.location[0] -
                        (this.direction === "east"
                          ? ii
                          : this.direction === "west"
                          ? -ii
                          : this.direction === "south" && this.pianyi
                          ? I_pianyi
                          : 0),
                      this.isCliakdata.location[1] -
                        (this.direction === "north"
                          ? ii
                          : this.direction === "south"
                          ? -ii
                          : 0),
                      this.isCliakdata.location[2],
                    ],
                    null
                  );
                  ii += this.LayerDisplacement;
                  I_pianyi += pianyiDisplacement;
                }, this.LayerSpend);
              }
            } else {
              console.log("%c 顶层不开启抽拉", "color:red");
            }
          } else {
            console.log(NeedhideIther, "NeedhideIther");
            this.hideIds = NeedhideIther.map((item: { id: any }) => item.id);
            // 关闭楼层
            if (this.isCliakVal) {
              this.isStopRun = false;
              let ii = 1;
              let II_pianyi = 1;
              this.timer4 = setInterval(async () => {
                if (ii > this.LayerDisplacementNum) {
                  // 关闭位移状态
                  this.isStopRun = true;
                  // 改变该楼层位置信息
                  this.isCliakdata = {
                    ...this.cObjectDatas[val],
                    location: [
                      this.cObjectDatas[val].location[0] -
                        (this.direction === "east"
                          ? ii
                          : this.direction === "west"
                          ? -ii
                          : this.direction === "south"
                          ? II_pianyi
                          : 0),
                      this.cObjectDatas[val].location[1] -
                        (this.direction === "north"
                          ? ii
                          : this.direction === "south"
                          ? -ii
                          : 0),
                      this.cObjectDatas[val].location[2],
                    ],
                  };
                  this.isClickLayerClose = true;
                  this.isCliakVal = null;

                  clearInterval(this.timer4);
                  return;
                }
                __g.tileLayer.setLocation(
                  this.isCliakdata.id,
                  [
                    this.isCliakdata.location[0] -
                      (this.direction === "east"
                        ? ii
                        : this.direction === "west"
                        ? -ii
                        : this.direction === "south"
                        ? II_pianyi
                        : 0),
                    this.isCliakdata.location[1] -
                      (this.direction === "north"
                        ? ii
                        : this.direction === "south"
                        ? -ii
                        : 0),
                    this.isCliakdata.location[2],
                  ],
                  null
                );
                ii += this.LayerDisplacement;
                II_pianyi += pianyiDisplacement;
              }, this.LayerSpend);
            }
            if (status) {
              __g.tileLayer.hide(this.hideIds);
              // __g.tileLayer.focus(this.cObjectDatas[val].id, 30, 1);
              this.Foolr = NeedHideLayer;
              // console.log(this.cObjectDatas[NeedHideLayer].id);
            } else {
              __g.tileLayer.show(this.hideIds);
            }
          }
        } else {
          console.log("%c 请先开启楼层", "color:red");
        }
      } else {
        console.log("%c 正处于位移状态，请稍后", "color:red");
      }
    } else {
      console.log("%c 尚未获取到模型信息，请稍后", "color:red");
    }
  }

  async HideAll() {
    // await __g.infoTree.show(this.treeids);
    await __g.tileLayer.hide(this.customObjectIds);
    this.Foolr = null;
  }

  async ShowAll() {
    await __g.tileLayer.show(this.customObjectIds);
    // await __g.infoTree.hide(this.treeids);
    this.Foolr = null;
  }
}
