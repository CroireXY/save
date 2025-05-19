import axios from '@/http/HTTP'
/**
 * 获取市区的数据
 * @returns
 */
export const getLayer = () => {
    return axios.get(window.origin + '/data/home/县界4547.geojson')
}

/**
 * 添加边框数据
 * @returns
 */
export const getBorder = () => {
    return axios.get(window.origin + '/data/home/市界4547.geojson')
}

/**
 * 获取车辆样式
 */
export const getCarAssetPathList = () => {
    return axios.get(`${window.origin}/mock/Library-car.json`)
}

/**
 * 获取地铁数据
 */
export const getMetroData = () => {
    return axios.get(`${window.origin}/data/home/地铁数据.geojson`)
}
export const getScenicData = () => {
    return axios.get(`${window.origin}/data/home/广州景点.geojson`)
}
