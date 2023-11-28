import request from ".";

/**
 * 获取首页轮播图
 * @param type 0: pc 1: android 2: iphone 3: ipad
 * @returns Promise
 */
export function getBanner(type: number = 0) {
    return request({
        url: '/banner?type=' + type,
        method: 'get',
    })
}

/**
 * 获取推荐歌单
 * @param limit 取出数量，默认为 10
 * @returns Promise
 */
export function getPersonalized(limit: number = 10) {
    return request({
        url: '/personalized',
        method: 'get',
        params: {
            limit: limit
        }
    })
}

/**
 * 推荐新音乐
 * @param limit 取出数量；默认为 10
 * @returns Promise
 */
export function getNewSong(limit: number = 10) {
    return request({
        url: '/personalized/newsong',
        method: 'get',
        params: {
            limit: limit
        }
    })
}