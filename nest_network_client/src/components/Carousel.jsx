import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";
import bgImg1 from '../assets/background/carousel1.jpg'
import bgImg2 from '../assets/background/carousel2.jpg'
import bgImg3 from '../assets/background/carousel3.jpg'

export default function Carousel() {
  return (
    <div className="container mx-auto py-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={bgImg1} text='Get Your Graphics Design in a minutes'/>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgImg2} text='Start Your digital marketing planning'/>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgImg3} text='Get Your website more flexible'/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
