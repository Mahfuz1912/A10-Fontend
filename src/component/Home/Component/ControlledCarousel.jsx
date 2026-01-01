import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import {
  FaGamepad,
  FaStar,
  FaUsers,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import {
  EffectFade,
  Autoplay,
  Pagination,
  Navigation,
  Parallax,
} from "swiper/modules";

const ControlledCarousel = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-purple-900/20 via-slate-900/40 to-purple-900/20 z-0"></div>

      <Swiper
        modules={[EffectFade, Autoplay, Pagination, Navigation, Parallax]}
        effect="fade"
        speed={1500}
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return `<span class="${className} bg-linear-to-r from-purple-500 to-pink-500"></span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="relative z-10 rounded-2xl shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[80vh]">
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-fit transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/70 to-slate-900/40"></div>
                <div className="absolute inset-0 bg-linear-to-r from-purple-900/30 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left: Text Content */}
                    <div className="text-white space-y-6">
                      {/* Game Tag */}
                      <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600/20 to-pink-600/20 px-4 py-2 rounded-full backdrop-blur-sm border border-purple-500/20">
                        <FaGamepad className="text-amber-400" />
                        <span className="text-sm font-medium text-amber-200">
                          Featured Game
                        </span>
                      </div>

                      {/* Title */}
                      <h1
                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                        data-swiper-parallax="-300"
                      >
                        <span className="bg-linear-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent">
                          {slide.title}
                        </span>
                      </h1>

                      {/* Description */}
                      <p
                        className="text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl"
                        data-swiper-parallax="-500"
                      >
                        {slide.description}
                      </p>

                      {/* Stats */}
                      <div
                        className="flex flex-wrap gap-6"
                        data-swiper-parallax="-700"
                      >
                        <div className="flex items-center gap-2">
                          <FaStar className="text-amber-500" />
                          <span className="text-xl font-bold">
                            {slide.rating}
                          </span>
                          <span className="text-slate-400">/10 Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-blue-500" />
                          <span className="text-xl font-bold">
                            {slide.players}
                          </span>
                          <span className="text-slate-400">Players</span>
                        </div>
                      </div>

                      {/* Genre Tags */}
                      <div
                        className="flex flex-wrap gap-2"
                        data-swiper-parallax="-900"
                      >
                        {slide.genres.map((genre, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 rounded-lg hover:border-purple-500/50 transition-colors"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div
                        className="flex flex-wrap gap-4 pt-4"
                        data-swiper-parallax="-1100"
                      >
                        <button
                          onClick={() => navigate("/allreviews")}
                          className="group px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 flex items-center gap-2"
                        >
                          <FaPlay />
                          Explore Reviews
                          <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Right: Additional Content */}
                    <div className="hidden lg:block">
                      <div
                        className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl"
                        data-swiper-parallax="-1300"
                      >
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Why Review Games?
                        </h3>
                        <ul className="space-y-3">
                          {[
                            "Help fellow gamers make informed choices",
                            "Share your unique gaming experiences",
                            "Build your reputation in the community",
                            "Discover new games through others' reviews",
                          ].map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 text-slate-300"
                            >
                              <div className="w-2 h-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIndex === idx
                          ? "w-8 bg-linear-to-r from-purple-500 to-pink-500"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-white hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">←</span>
          </div>
        </div>
        <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-white hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">→</span>
          </div>
        </div>
      </Swiper>

      {/* Active Slide Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-slate-300">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

// Slides Data
const slides = [
  {
    id: 1,
    img: "https://wallpapercave.com/wp/wp11425017.jpg",
    title: "Efootball 2026",
    description:
      "Experience the thrill of virtual soccer like never before with realistic physics, stunning graphics, and competitive multiplayer gameplay.",
    rating: "9.2",
    players: "10M+",
    genres: ["Sports", "Multiplayer", "Simulation"],
  },
  {
    id: 2,
    img: "https://wallpapers.com/images/featured/pubg-go20ghrcj4ybxhvq.jpg",
    title: "PUBG Mobile",
    description:
      "Join the ultimate battle royale experience on mobile. Survive, loot, and dominate in intense 100-player matches with friends.",
    rating: "8.9",
    players: "100M+",
    genres: ["Battle Royale", "Action", "Shooter"],
  },
  {
    id: 3,
    img: "https://wallpapers.com/images/featured/free-fire-gi0jpopdq4b0q5aj.jpg",
    title: "Free Fire",
    description:
      "Ignite your passion for fast-paced battle royale action. Quick matches, unique characters, and intense survival gameplay await.",
    rating: "8.5",
    players: "80M+",
    genres: ["Battle Royale", "Fast-Paced", "Mobile"],
  },
  {
    id: 4,
    img: "https://valorantstrike.com/wp-content/uploads/2020/07/Valorant-Wallpaper-Boys-Rainbow-Display.jpg",
    title: "Valorant",
    description:
      "Precision, strategy, and teamwork combine in this tactical shooter. Master unique agents and compete in ranked matches.",
    rating: "9.0",
    players: "20M+",
    genres: ["Tactical", "Shooter", "Competitive"],
  },
];

export default ControlledCarousel;
