import type {PersonalizedResult} from "@/api/Home.d";

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
    banners: Banners[],
    setBanners: (banners: Banners[]) => void,
    recomPlayList: PersonalizedResult | [],
    setRecomPlayList: (recomPlayList: PersonalizedResult) => void
}