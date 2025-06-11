// @ts-check
import { defineStore } from 'pinia'

export const useDisplayStore = defineStore({
    id: 'Display',
    state: () => ({
        // 是否第一次加载城市风貌
        showCityAppearance: false,
        // 是否第一次加载行政区划
        showAdministrativeArea: false,
        // 是否第一次加载历史遗留
        showHistory: false,
        // 是否第一次加载交通预警
        showTrafficWarning: false,
        // 是否第一次加载短途接驳
        showShortConnection: false,
        // 是否第一次加载交通态势
        showTrafficSituation: false,
        // 是否第一次加载地铁规划
        showMetroPlanning: false,
        // 是否第一次加载智慧社区
        showIntelligenceCommunity: false,
        // 是否第一次加载景区分布
        showScenicSpot: false,
        // 存储shp点
        shpHasShowArr: []
    }),

    actions: {
        // 修改是否第一次加载景区分布
        async SetShowScenicSpot(showScenicSpot: any) {
            this.$patch({
                showScenicSpot: showScenicSpot
            })
        },
        // 修改是否第一次加载地铁规划
        async SetShowIntelligenceCommunity(showIntelligenceCommunity: any) {
            this.$patch({
                showIntelligenceCommunity: showIntelligenceCommunity
            })
        },
        // 修改是否第一次加载地铁规划
        async SetShowMetroPlanning(showMetroPlanning: any) {
            this.$patch({
                showMetroPlanning: showMetroPlanning
            })
        },
        // 修改是否第一次加载行政区划
        async SetShowAdministrativeArea(showAdministrativeArea: any) {
            this.$patch({
                showAdministrativeArea: showAdministrativeArea
            })
        },
        // 修改是否第一次加载交通态势
        async SetShowTrafficSituation(showTrafficSituation: any) {
            this.$patch({
                showTrafficSituation: showTrafficSituation
            })
        },
        // 修改是否第一次加载短途接驳
        async SetShowShortConnection(showShortConnection: any) {
            this.$patch({
                showShortConnection: showShortConnection
            })
        },
        // 修改是否第一次加载交通预警
        async SetShowTrafficWarning(showTrafficWarning: any) {
            this.$patch({
                showTrafficWarning: showTrafficWarning
            })
        },
        // 修改是否第一次加载城市风貌
        async SetShowCityAppearance(showCityAppearance: any) {
            this.$patch({
                showCityAppearance: showCityAppearance
            })
        },
        // 修改是否第一次加载历史遗留
        async SetShowHistory(showHistory: any) {
            this.$patch({
                showHistory: showHistory
            })
        },
        // 设置shp数组
        async SetShpHasShowArr(shpHasShowArr: any) {
            this.$patch({
                shpHasShowArr: shpHasShowArr
            })
        }
    }
})
