import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <div>
      <Swiper
        style={{
          "--swiper-pagination-color": "#A91D3A",
          "--swiper-navigation-color": "#A91D3A",
          "--swiper-pagination-bullet-inactive-color": "#999999",
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[60svh] md:h-[92svh]"
      >
        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.5)),url(https://i.ibb.co/GRSSBS9/Untitled-design.png)",
          }}
          className="bg-no-repeat bg-cover bg-top"
        >
          <div className="flex justify-center items-center h-full">
            <div>
              <h2 className="text-center w-3/4 md:w-full mx-auto text-xl md:text-4xl font-extrabold text-whiteM">
                Find Your Perfect Match
              </h2>
              <p className="text-center text-gray-400 mt-8 w-3/4 mx-auto">
                At Destined Affinity, we believe that true love knows no
                boundaries. Connect with your soulmate from our vast and diverse
                community. Start your journey towards a lifetime of happiness
                today!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.5)),url(https://i.ibb.co/3F5yFND/Untitled-design-2.jpg)",
          }}
          className="bg-no-repeat bg-cover bg-top"
        >
          <div className="flex justify-center items-center h-full">
            <div>
              <h2 className="text-center w-3/4 md:w-full mx-auto text-xl md:text-4xl font-extrabold text-whiteM">
                Personalized Matches
              </h2>
              <p className="text-center text-gray-400 mt-8 w-3/4 mx-auto">
                Our intelligent matchmaking system brings you personalized
                matches that align with your preferences and values. Experience
                a seamless journey to find your ideal partner with tailored
                recommendations.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.5)),url(https://i.ibb.co/Dg1DzqC/Untitled-design-3.jpg)",
          }}
          className="bg-no-repeat bg-cover bg-top"
        >
          <div className="flex justify-center items-center h-full">
            <div>
              <h2 className="text-center w-3/4 md:w-full mx-auto text-xl md:text-4xl font-extrabold text-whiteM">
                Secure and Easy to Use
              </h2>
              <p className="text-center text-gray-400 mt-8 w-3/4 mx-auto">
                Your safety is our priority. Our user-friendly interface and
                robust security measures make finding love easy and worry-free.
                Sign up today and take the first step towards finding your
                perfect match in a secure environment.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
