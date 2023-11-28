import { getBanner } from "@/api/Home";
import useHomeState from "@/state/useHomeState/useHomeState";
import { useSnapshot } from "valtio";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css'
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

export default function Header() {
    const snap = useSnapshot(useHomeState)
    if (snap.banners.length === 0) {
        getBanner().then((res: any) => {
            snap.setBanners(res.banners)
        })
    }
    return (
        <div className="w-full h-80">
            <Swiper
                className="w-[90%] h-full rounded-[24px]"
                effect={'coverflow'}
                grabCursor={false}
                centeredSlides={true}
                loop={true}
                slidesPerView={1.8}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                noSwiping={true}
                allowTouchMove={false}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                modules={[Autoplay, EffectCoverflow]}>
                {
                    snap.banners.map((banner, index) => {
                        return (
                            <SwiperSlide className="rounded-[24px] overflow-hidden" key={index}>
                                <img src={banner.imageUrl} alt="" className="w-full h-full rounded-[24px]" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}