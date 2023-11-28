export interface Banners {
    imageUrl:           string;
    targetId:           number;
    targetType:         number;
    titleColor:         string;
    typeTitle:          string;
    exclusive:          boolean;
    encodeId:           string;
    scm:                string;
    bannerBizType:      string;
}
export interface HomeState {
    menu: {
        router: string,
        name: string
    }[],
    mode: 'light' | 'dark',
    menuChiose: string,
    menuSelect: (router: string) => void,
    banners: Banners[],
    setBanners: (banners: Banners[]) => void
}