import { proxy } from "valtio";
import type {Settings} from './settings.d'

const settings = proxy<Settings>({
    darkMode: 'system',
    setDarkMode: (darkMode) => {
        settings.darkMode = darkMode
    }
})

export type {Settings}
export default settings