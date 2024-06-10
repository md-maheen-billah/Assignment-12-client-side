import { BsFillPeopleFill } from "react-icons/bs";
import { RiFileEditFill } from "react-icons/ri";
import { TbUserStar } from "react-icons/tb";
import SectionTitle from "../../../components/SectionTitle";
import { useEffect } from "react";
import Aos from "aos";

const HowItWorks = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  return (
    <div data-aos="fade-up">
      <div>
        <SectionTitle
          subHeading={
            "Embark on Your Journey to Love: Understanding How Our Platform Works."
          }
          heading={"How It Works"}
        ></SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2 text-reddM mb-8 lg:mb-16">
          <div className="  flex justify-center items-center flex-col gap-1 ">
            <RiFileEditFill size={100} />
            <p className="font-semibold text-2xl text-center text-whiteM">
              Sign Up
            </p>
            <p className="font-light text-base w-56 text-center text-whiteM">
              Register for free & put up your Matrimony Profile
            </p>
          </div>
          <div className="flex justify-center items-center flex-col gap-1 ">
            <BsFillPeopleFill size={100} />
            <p className="font-semibold text-2xl text-center text-whiteM">
              Search
            </p>
            <p className="font-light text-base w-56 text-center text-whiteM">
              Browse & Contact with Matches of your preference
            </p>
          </div>
          <div className=" flex justify-center items-center flex-col gap-1 ">
            <TbUserStar size={100} />
            <p className="font-semibold text-2xl text-center text-whiteM">
              Interact
            </p>
            <p className="font-light text-base w-56 text-center text-whiteM">
              Become a Premium Member for perks extra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
