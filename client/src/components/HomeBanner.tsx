import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import Banner4 from "../assets/Banner4.png";
import Banner5 from "../assets/Banner5.png";
import Banner6 from "../assets/Banner6.png";

const HomeBanner = () => {
  const sliderRef = React.useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: false,
    variableWidth: false,
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider */}
      <Slider ref={sliderRef} {...settings} className="w-full">
        {[Banner1, Banner2, Banner3, Banner4, Banner5, Banner6].map(
          (banner, index) => (
            <div key={index} className="w-full">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-screen h-auto object-cover max-h-[500px]"
              />
            </div>
          )
        )}
      </Slider>

      {/* Custom Left Button */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute top-1/2 left-[10px] transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md transition hover:bg-purple"
      >
        <ChevronLeft size={28} className="text-purple hover:text-white" />
      </button>

      {/* Custom Right Button */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute top-1/2 right-[10px] transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md transition hover:bg-purple"
      >
        <ChevronRight size={28} className="text-purple hover:text-white" />
      </button>
    </div>
  );
};

export default HomeBanner;
