// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  Parallax,
  A11y,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function ControlledCarousel() {
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, Parallax, A11y]}
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      speed={1000}
      parallax={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      lazy={true}
      a11y={{
        enabled: true,
      }}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-[70vh] object-fill"
            loading="lazy"
          />
          <div className="slide-overlay pb-12">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              data-swiper-parallax="-9000"
            >
              {slide.title}
            </h2>
            <p
              className="slide-text mt-3 md:mt-4 text-lg md:text-xl lg:text-2xl max-w-5xl"
              data-swiper-parallax="-9000"
            >
              {slide.text}
            </p>
            <button
              onClick={() => navigate("/allreviews")}
              className="slide-button btn btn-primary w-1/5 mt-6"
              data-swiper-parallax="000"
            >
              Learn More
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// Slides Data (clean & reusable)
const slides = [
  {
    img: "https://tse2.mm.bing.net/th/id/OIP.3xXADbHeHii40hgk_eAEpAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Efootball",
    text: "Efootball: Experience the thrill of virtual soccer like never before.",
  },
  {
    img: "https://tse1.mm.bing.net/th/id/OIP.UAkzJulkbWCyXnAixCnKJAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "PUBG Mobile",
    text: "PUBG Mobile: Experience the thrill of battle royale on your mobile device.",
  },
  {
    img: "https://wallpapercave.com/wp/wp11149565.jpg",
    title: "Free Fire",
    text: "Free Fire: Ignite your passion for battle royale gaming.",
  },
];
