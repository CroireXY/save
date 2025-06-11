import { defineStore } from 'pinia'

export const useToolsStore = defineStore({
    id: 'Tools',
    state: () => ({
        UIShow: true,
        //   图层树展示
        LayerTreeShow: false,
        infotree: null,
        // 导览列表展示
        AnimationShow: false,
        // 天空盒展示
        SkyBoxShow: false,
        // 气象展示
        WeatherShow: false,
        // 建筑拆解展示
        BuildShow: false,
        // 拆楼信息保存
        Buildinfo: null,
        // 工具栏展示
        TooBarShow: false,
        // 显示路径规划
        RoutePlaningShow: false,
        // 鼠标点击位置
        downXY: {
            x: 0,
            y: 0
        },
        // 当前右键点击坐标
        nowLocation: []
    }),

    actions: {
        async SetUIShow(pyload: any) {
            this.$patch({
                UIShow: pyload,
            });
          },
        /**
         * 设置右键点击坐标
         * @param downXY
         * @constructor
         */
        SetNowLocation(nowLocation: any) {
            this.nowLocation = nowLocation
        },
        /**
         * 记录鼠标坐标
         * @param downXY
         * @constructor
         */
        SetDownXY(downXY: any) {
            this.downXY = downXY
        },
        /**
         * 设置路径规划显示
         * @param RoutePlaningShow
         * @constructor
         */
        SetRoutePlaningShow(RoutePlaningShow: any) {
            this.RoutePlaningShow = RoutePlaningShow
        },
        /**
         * 展示工具栏
         * @param isShowToolBar
         */
        SetToolBarShow(isShowToolBar: boolean) {
            // this.$reset()
            this.TooBarShow = isShowToolBar
        },
        async SetLayerTreeShow(pyload: any) {
            this.$patch({
                LayerTreeShow: pyload
            })
        },
        async Setinfotree(pyload: any) {
            this.$patch({
                infotree: pyload
            })
        },
        async SetAnimationShow(pyload: any) {
            this.$patch({
                AnimationShow: pyload
            })
        },
        async SetSkyBoxShow(pyload: any) {
            this.$patch({
                SkyBoxShow: pyload
            })
        },
        async SetWeatherShow(pyload: any) {
            this.$patch({
                WeatherShow: pyload
            })
        },
        async SetBuildShow(pyload: any) {
            this.$patch({
                BuildShow: pyload
            })
        },
        async SetBuildinfo(pyload: any) {
            this.$patch({
                Buildinfo: pyload
            })
        }
    }
})
