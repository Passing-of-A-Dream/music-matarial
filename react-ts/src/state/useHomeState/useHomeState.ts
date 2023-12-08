import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import type { HomeState } from './useHomeState.d'

const useHomeState = proxy<HomeState>({
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