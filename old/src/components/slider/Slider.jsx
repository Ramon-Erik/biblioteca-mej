import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css";

const Slider = (props) => {
  return (
    <>
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination, A11y]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        navigation
        loop
        style={{
          "--swiper-pagination-color": "#AC0A1D",
          "--swiper-navigation-color": "#AC0A1D",
        }}      
      >
        {props.imgs.map((i) => (
          <SwiperSlide key={i.id}>
            {<img src={i.link} alt={i.alt} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
