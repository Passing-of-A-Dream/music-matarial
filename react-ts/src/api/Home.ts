import request from ".";
import type { Personalized } from "./Home.d";
import * as ApiSettings from '@/files/api.json';

/**
 * 获取首页轮播图
 * @returns Promise
 */
export function getBanner() {
    return request({
        url: ApiSettings.HOME.banner.url,
        method: ApiSettings.HOME.banner.method,
        params: ApiSettings.HOME.banner.params
    })
}

/**
 * 获取推荐歌单
 * @returns Promise<Personalized>
 */
export function getPersonalized():Promise<Personalized> {
    return request({
        url: ApiSettings.HOME.personalized.url,
        method: ApiSettings.HOME.personalized.method,
        params: ApiSettings.HOME.personalized.params
    })
}

/**
 * 推荐新音乐
 * @returns Promise
 */
export function getNewSong() {
    return request({
        url: ApiSettings.HOME.personalizedNewsong.url,
        method: ApiSettings.HOME.personalizedNewsong.method,
        params: ApiSettings.HOME.personalizedNewsong.params
    })
}