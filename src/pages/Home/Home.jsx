import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Banner from "./Banner/Banner";
import PremiumMembers from "./PremiumMembers/PremiumMembers";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import SuccessStory from "./SuccessStory/SuccessStory";
import LoadingSpinner from "../../components/LoadingSpinner";
import HowItWorks from "./HowItWorks/HowItWorks";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: pusers = [], isLoading } = useQuery({
    queryKey: ["pusers"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users-premium`);
      return data;
    },
  });
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div data-aos="fade-out">
      <Banner></Banner>
      <div className="max-w-[1280px] mx-auto px-2">
        <PremiumMembers></PremiumMembers>
        <HowItWorks></HowItWorks>
        <SuccessCounter></SuccessCounter>
        <SuccessStory></SuccessStory>
      </div>
    </div>
  );
};

export default Home;
