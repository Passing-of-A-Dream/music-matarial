
// 推荐歌单
export interface Personalized {
    category: number,
    code: number,
    hasTaste: boolean,
    result: PersonalizedResult[],
}
export interface PersonalizedResult {
    id:                    number;
    type:                  number;
    name:                  string;
    copywriter:            string;
    picUrl:                string;
    canDislike:            boolean;
    trackNumberUpdateTime: number;
    playCount:             number;
    trackCount:            number;
    highQuality:           boolean;
    alg:                   Alg;
}
export enum Alg {
    BysongRt = "bysong_rt",
    BysongSupRt = "bysong_sup_rt",
    BytrackRt = "bytrack_rt",
}