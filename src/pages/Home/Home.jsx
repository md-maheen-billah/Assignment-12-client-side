import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Banner from "./Banner/Banner";
import PremiumMembers from "./PremiumMembers/PremiumMembers";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import SuccessStory from "./SuccessStory/SuccessStory";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: pusers = [], isLoading } = useQuery({
    queryKey: ["pusers"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users-premium`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-[1280px] mx-auto px-2">
        <PremiumMembers></PremiumMembers>
        <SuccessCounter></SuccessCounter>
        <SuccessStory></SuccessStory>
      </div>
    </div>
  );
};

export default Home;
