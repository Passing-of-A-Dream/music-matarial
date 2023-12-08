import { proxy } from "valtio";
import type {GlobaVarlot} from './globaVarlot.d'

const globaVarlot = proxy<GlobaVarlot>({
    menu: [
        {
            router: '/',
            name: '首页'
        },
        {
            router: '/explore',
            name: '探索'
        },
        {
            router: '/settings',
            name: '设置'
        },
        {
            router: 'none',
            name: '播放',
            click: () => {
                globaVarlot.isPlay = !globaVarlot.isPlay
            }
        }
    ],
    mode: 'light',
    menuChiose: '/',
    menuSelect: (router, click) => {
        if (click) {
            click()
        } else {
            globaVarlot.menuChiose = router
        }
    },
    isPlay: false,
    setIsPlay: (isPlay) => {
        globaVarlot.isPlay = isPlay
    },
})

export default globaVarlot