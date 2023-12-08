export interface GlobaVarlot {
    menu: {
        router: string,
        name: string,
        click?: () => void
    }[],
    mode: 'light' | 'dark',
    menuChiose: string,
    menuSelect: (router: string, click?: () => void) => void,
    isPlay: boolean,
    setIsPlay: (isPlay: boolean) => void,
}