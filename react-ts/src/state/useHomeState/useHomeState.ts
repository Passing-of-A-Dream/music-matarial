import { proxy } from 'valtio'
import {subscribeKey} from 'valtio/utils'
import type {HomeState} from './useHomeState.d'

const useHomeState = proxy<HomeState>({
    menu: [
        {
            router: '/',
            name: '首页'
        },
        {
            router: '/explore',
            name: '探索'
        },
    ],
    mode: 'light',
    menuChiose: '/',
    menuSelect: (router) => {
        useHomeState.menuChiose = router
    },
    banners: JSON.parse(localStorage.getItem('banners') || '[]'),
    setBanners: (banners) => {
        useHomeState.banners = banners
    },
    recomPlayList: [],
    setRecomPlayList: (recomPlayList) => {
        useHomeState.recomPlayList = recomPlayList
    }
})

subscribeKey(useHomeState, 'banners', (banners) => {
    localStorage.setItem('banners', JSON.stringify(banners))
})

export default useHomeState